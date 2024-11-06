const { chainCall } = require("../../../chainApi");
const { getAccountData } = require("./getAccount");
const BigNumber = require("bignumber.js");

function calcTransferable(info) {
  const { free, frozen, reserved } = info;
  const frozenReserveDif = new BigNumber(frozen).minus(reserved);
  const noZeroConsidered = new BigNumber(free || 0)
    .minus(BigNumber.max(frozenReserveDif, 0))
    .toString();
  return BigNumber.max(noZeroConsidered, 0).toString();
}

function extractAccountInfo(accountData) {
  if (!accountData) {
    return null;
  }

  const { data: { free, reserved, feeFrozen, miscFrozen } = {} } =
    accountData.account || {};
  const { lockedBalance, lockedBreakdown, namedReserves } =
    accountData.balanceAll || {};
  const { stakingLedger } = accountData.stakingInfo || {};

  const allReserves = namedReserves?.reduce((t, r) => t.concat(...r), []);
  const transferrable = calcTransferable(
    accountData.systemAccount.data.toJSON(),
  );

  return {
    data: {
      free: free?.toBigInt().toString(),
      reserved: reserved?.toBigInt().toString(),
      feeFrozen: feeFrozen?.toBigInt().toString(),
      miscFrozen: miscFrozen?.toBigInt().toString(),
      total: (free?.toBigInt() + reserved?.toBigInt()).toString(),
      transferrable,
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

async function account(_, _args) {
  const { address } = _args;
  const extrinsicData = await chainCall((api) => getAccountData(api, address));
  return extractAccountInfo(extrinsicData);
}

module.exports = {
  chainAccount: account,
};
