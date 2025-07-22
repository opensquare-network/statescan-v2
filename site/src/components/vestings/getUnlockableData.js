import isNil from "lodash.isnil";
import isInteger from "lodash.isinteger";
import BigNumber from "bignumber.js";

export default function getUnlockableData(latestHeight, vesting) {
  const { startingBlock, perBlock, locked } = vesting;

  if (isNil(latestHeight) || startingBlock > latestHeight) {
    return { unlockableBalance: "0", unlockablePercentage: "0" };
  }

  const bnLatestHeight = new BigNumber(latestHeight);
  const bnStartingBlock = new BigNumber(startingBlock);
  const bnPerBlock = new BigNumber(perBlock);
  const bnLocked = new BigNumber(locked);

  const unlockableBalance = BigNumber.max(
    0,
    BigNumber.min(
      bnLocked,
      bnLatestHeight.minus(bnStartingBlock).multipliedBy(bnPerBlock),
    ),
  );

  const rawPercentage = bnLocked.isZero()
    ? new BigNumber(0)
    : unlockableBalance.dividedBy(bnLocked).multipliedBy(100);

  const unlockablePercentage = isInteger(rawPercentage.toNumber())
    ? rawPercentage.toFixed(0)
    : rawPercentage.toFixed(2);

  return {
    unlockableBalance: unlockableBalance.toString(),
    unlockablePercentage,
  };
}
