import { normalizeEvmAddress } from "../../utils/normalizeAddress";
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
  const queryResult = useLidoAddressProfileData(address);

  return {
    ...queryResult,
    data: queryResult.data
      ? {
          stEthBalance: queryResult.data.stEthBalance,
          stEthShares: queryResult.data.stEthShares,
          wstEthBalance: queryResult.data.wstEthBalance,
        }
      : emptyBalancesData,
  };
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
