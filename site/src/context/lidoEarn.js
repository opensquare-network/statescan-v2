import { createContext, useCallback, useContext, useMemo } from "react";
import { getAddress, isAddress } from "viem";
import { useLidoStatusData } from "../hooks/lido/useLidoStatusData";

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

export function LidoEarnProvider({ children }) {
  const { data, loading } = useLidoStatusData("lido-earn-asset-metadata", {
    items: [],
  });
  const { decimals, symbols } = useMemo(() => {
    const items = data?.items || [];

    return {
      decimals: Object.fromEntries(
        items.map((item) => [getAssetAddressKey(item.address), item.decimals]),
      ),
      symbols: Object.fromEntries(
        items.map((item) => [getAssetAddressKey(item.address), item.symbol]),
      ),
    };
  }, [data]);

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
      loading,
      symbols,
    }),
    [decimals, getAssetDecimals, getAssetSymbol, loading, symbols],
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
