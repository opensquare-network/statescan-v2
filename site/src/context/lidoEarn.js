import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { erc20Abi, getAddress, isAddress, isAddressEqual } from "viem";
import { LIST_DEFAULT_PAGE_SIZE } from "../utils/constants";
import evmPublicClient from "../services/evm/client";
import { GET_LIDO_EARN_ACTIVE_QUEUES } from "../services/gql/lido";
import { useLidoServerQuery } from "../hooks/lido/useLidoQuery";

const EVM_NATIVE_ASSET_ADDRESS = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";

const LidoEarnContext = createContext({
  getAssetDecimals: () => undefined,
  getAssetSymbol: () => undefined,
  decimals: {},
  loading: false,
  symbols: {},
});

function getAssetAddressKey(address) {
  return address && isAddress(address) ? getAddress(address) : undefined;
}

function isNativeAsset(address) {
  return (
    isAddress(address) && isAddressEqual(address, EVM_NATIVE_ASSET_ADDRESS)
  );
}

async function fetchAssetMetadata(address) {
  if (!address) {
    return { decimals: undefined, symbol: undefined };
  }

  if (isNativeAsset(address)) {
    return { decimals: 18, symbol: "ETH" };
  }

  if (!evmPublicClient) {
    return { decimals: undefined, symbol: undefined };
  }

  const [symbol, decimals] = await Promise.all([
    evmPublicClient.readContract({
      address,
      abi: erc20Abi,
      functionName: "symbol",
    }),
    evmPublicClient.readContract({
      address,
      abi: erc20Abi,
      functionName: "decimals",
    }),
  ]);

  return { decimals, symbol };
}

export function LidoEarnProvider({ children }) {
  const [decimals, setDecimals] = useState({});
  const [metadataLoading, setMetadataLoading] = useState(false);
  const [symbols, setSymbols] = useState({});
  const { data, loading: queuesLoading } = useLidoServerQuery(
    GET_LIDO_EARN_ACTIVE_QUEUES,
    {
      variables: {
        active: true,
        limit: LIST_DEFAULT_PAGE_SIZE,
        offset: 0,
      },
    },
  );
  const assetAddresses = useMemo(() => {
    const uniqueAddresses = new Map();

    for (const item of data?.earnQueues?.items || []) {
      const normalizedAddress = getAssetAddressKey(item.asset);

      if (normalizedAddress && !uniqueAddresses.has(normalizedAddress)) {
        uniqueAddresses.set(normalizedAddress, item.asset);
      }
    }

    return Array.from(uniqueAddresses.values());
  }, [data]);

  useEffect(() => {
    let canceled = false;

    async function fetchMetadata() {
      if (!assetAddresses.length) {
        setDecimals({});
        setSymbols({});
        setMetadataLoading(false);
        return;
      }

      setMetadataLoading(true);

      const entries = await Promise.all(
        assetAddresses.map(async (address) => {
          try {
            const metadata = await fetchAssetMetadata(address);

            return [getAssetAddressKey(address), metadata];
          } catch {
            return [
              getAssetAddressKey(address),
              { decimals: undefined, symbol: undefined },
            ];
          }
        }),
      );

      if (!canceled) {
        setDecimals(
          Object.fromEntries(
            entries.map(([address, metadata]) => [address, metadata.decimals]),
          ),
        );
        setSymbols(
          Object.fromEntries(
            entries.map(([address, metadata]) => [address, metadata.symbol]),
          ),
        );
        setMetadataLoading(false);
      }
    }

    fetchMetadata();

    return () => {
      canceled = true;
    };
  }, [assetAddresses]);

  const getAssetSymbol = useCallback(
    (address) => symbols[getAssetAddressKey(address)],
    [symbols],
  );
  const getAssetDecimals = useCallback(
    (address) => decimals[getAssetAddressKey(address)],
    [decimals],
  );
  const value = useMemo(
    () => ({
      decimals,
      getAssetDecimals,
      getAssetSymbol,
      loading: queuesLoading || metadataLoading,
      symbols,
    }),
    [
      decimals,
      getAssetDecimals,
      getAssetSymbol,
      metadataLoading,
      queuesLoading,
      symbols,
    ],
  );

  return (
    <LidoEarnContext.Provider value={value}>
      {children}
    </LidoEarnContext.Provider>
  );
}

export function useLidoEarnAssets() {
  return useContext(LidoEarnContext);
}
