import { useEffect, useState } from "react";
import { useChainApi } from "../utils/hooks/chain/useChainApi";

export default function useOnChainAccountData(address) {
  const api = useChainApi();
  const [account, setAccount] = useState();
  const [balanceAll, setBalanceAll] = useState();
  const [stakingInfo, setStakingInfo] = useState();

  useEffect(() => {
    if (!api || !address) {
      return;
    }

    api.query.system.account(address).then((data) => {
      const accountInfo = api.registry.createType(
        "AccountInfo",
        data.toHex(),
        true,
      );
      setAccount(accountInfo);
    });

    if (api.derive.balances?.all) {
      api.derive.balances?.all(address).then((data) => {
        setBalanceAll(data);
      });
    } else {
      setBalanceAll(null);
    }

    if (api.derive.staking?.account) {
      api.derive.staking?.account(address).then((data) => {
        setStakingInfo(data);
      });
    } else {
      setStakingInfo(null);
    }
  }, [api, address]);

  if (
    account === undefined ||
    balanceAll === undefined ||
    stakingInfo === undefined
  ) {
    return null;
  }

  return { account, balanceAll, stakingInfo };
}
