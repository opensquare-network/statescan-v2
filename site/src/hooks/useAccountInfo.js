import { useMemo } from "react";

function extractAccountInfo(accountData) {
  if (!accountData) {
    return null;
  }

  const { data: { free, reserved, feeFrozen, miscFrozen } = {} } =
    accountData.account || {};
  const { lockedBalance, lockedBreakdown, availableBalance, namedReserves } =
    accountData.balanceAll || {};
  const { stakingLedger } = accountData.stakingInfo || {};

  const allReserves = namedReserves?.reduce((t, r) => t.concat(...r), []);

  return {
    data: {
      free: free?.toBigInt().toString(),
      reserved: reserved?.toBigInt().toString(),
      feeFrozen: feeFrozen?.toBigInt().toString(),
      miscFrozen: miscFrozen?.toBigInt().toString(),
      total: (free?.toBigInt() + reserved?.toBigInt()).toString(),
      transferrable: availableBalance?.toBigInt().toString(),
      lockedBalance: lockedBalance?.toBigInt().toString(),
      lockedBreakdown: lockedBreakdown?.map((item) => ({
        reasons: item.reasons.toJSON(),
        amount: item.amount.toBigInt().toString(),
        id: item.id.toHuman(),
      })),
      reservedBreakdown: allReserves?.map((item) => ({
        amount: item.amount.toBigInt().toString(),
        id: item.id.toHuman(),
      })),
      bonded: stakingLedger?.active?.toBigInt().toString(),
    },
    detail: accountData.account?.toJSON(),
  };
}

export default function useAccountInfo(accountData) {
  return useMemo(() => {
    if (!accountData) {
      return null;
    }
    return extractAccountInfo(accountData);
  }, [accountData]);
}
