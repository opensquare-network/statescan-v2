import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { normalizeEvmAddress } from "../../utils/normalizeAddress";
import evmPublicClient from "../../services/evm/client";
import {
  LIDO_BALANCE_ABI,
  LIDO_STETH_ADDRESS,
  LIDO_WSTETH_ADDRESS,
} from "../../services/evm/lido";
import { addToast } from "../../store/reducers/toastSlice";
import { useLidoStatusData } from "./useLidoStatusData";

const emptyBalancesData = {
  stEthBalance: null,
  stEthShares: null,
  wstEthBalance: null,
};

export function useLidoAddressProfileData(address) {
  const normalizedAddress = normalizeEvmAddress(address)?.toLowerCase();
  const queryResult = useLidoStatusData("lido-address-profiles", {
    items: [],
  });

  return {
    ...queryResult,
    data:
      queryResult.data?.items?.find(
        (item) => item.address === normalizedAddress,
      ) || null,
  };
}

export function useLidoAddressBalancesData(address) {
  const dispatch = useDispatch();
  const normalizedAddress = normalizeEvmAddress(address);
  const [data, setData] = useState(emptyBalancesData);
  const [loading, setLoading] = useState(Boolean(normalizedAddress));

  useEffect(() => {
    if (!normalizedAddress) {
      setData(emptyBalancesData);
      setLoading(false);
      return;
    }

    if (!evmPublicClient) {
      const rpcError = new Error("EVM RPC URL is not set");
      setData(emptyBalancesData);
      setLoading(false);
      dispatch(addToast({ type: "error", message: rpcError.message }));
      return;
    }

    setData(emptyBalancesData);
    setLoading(true);

    evmPublicClient
      .multicall({
        allowFailure: false,
        contracts: [
          {
            address: LIDO_STETH_ADDRESS,
            abi: LIDO_BALANCE_ABI,
            functionName: "balanceOf",
            args: [normalizedAddress],
          },
          {
            address: LIDO_STETH_ADDRESS,
            abi: LIDO_BALANCE_ABI,
            functionName: "sharesOf",
            args: [normalizedAddress],
          },
          {
            address: LIDO_WSTETH_ADDRESS,
            abi: LIDO_BALANCE_ABI,
            functionName: "balanceOf",
            args: [normalizedAddress],
          },
        ],
      })
      .then(([stEthBalance, stEthShares, wstEthBalance]) => {
        setData({ stEthBalance, stEthShares, wstEthBalance });
        setLoading(false);
      })
      .catch((rpcError) => {
        setData(emptyBalancesData);
        setLoading(false);
        dispatch(
          addToast({
            type: "error",
            message: rpcError.message || "Failed to load Lido balances",
          }),
        );
      });
  }, [dispatch, normalizedAddress]);

  return { data, loading };
}

export function useLidoEvmBalanceData(address) {
  const queryResult = useLidoAddressProfileData(address);

  return {
    ...queryResult,
    data: queryResult.data?.ethBalance ?? null,
  };
}

export function useLidoStEthBalanceData(accountAddress) {
  const queryResult = useLidoAddressProfileData(accountAddress);

  return {
    ...queryResult,
    data: queryResult.data?.stEthBalance ?? null,
  };
}
