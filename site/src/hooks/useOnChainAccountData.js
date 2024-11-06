import { useCallback, useEffect, useState } from "react";
import { useChainApi } from "../utils/hooks/chain/useChainApi";

export default function useOnChainAccountData(address) {
  const api = useChainApi();
  const [accountData, setAccountData] = useState();

  const fetchAccountData = useCallback(async () => {
    if (!api || !address) {
      return;
    }

    const [account, balanceAll, stakingInfo] = await Promise.all([
      api.query.system.account(address),
      api.derive.balances?.all(address).catch(() => null),
      api.derive.staking?.account(address).catch(() => null),
    ]);

    if (!account) {
      setAccountData(null);
      return;
    }

    const accountInfo = api.registry.createType(
      "AccountInfo",
      account.toHex(),
      true,
    );

    setAccountData({
      systemAccount: account,
      account: accountInfo,
      balanceAll,
      stakingInfo,
    });
  }, [api, address]);

  useEffect(() => {
    fetchAccountData().catch(() => setAccountData(null));
  }, [fetchAccountData]);

  return accountData;
}
