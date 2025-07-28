const { handleRewardByPayoutStakersV2 } = require("./payoutStakersV2");
const {
  call: { findLeafOriginAndCalls },
  env: { currentChain },
  consts: { CHAINS },
} = require("@osn/scan-common");
const { handleRewardByPayoutValidator } = require("./payoutValidator");
const { hasPayoutValidatorCall } = require("./common/hasPayoutValidatorCall");
const { handleRewardByPayoutNominator } = require("./payoutNominator");

function isOnlyPayoutValidator(leafCalls = []) {
  return leafCalls.every((leaf) => leaf.call.method === "payoutValidator");
}

function isOnlyPayoutNominator(leafCalls = []) {
  return leafCalls.every((leaf) => leaf.call.method === "payoutNominator");
}

async function handleRewardWithAccountAndBalance(event, indexer, extrinsic) {
  if (currentChain() !== CHAINS.KUSAMA) {
    await handleRewardByPayoutStakersV2(event, indexer, extrinsic);
    return;
  }

  const hasPayoutValidatorInMetadata = await hasPayoutValidatorCall(
    indexer.blockHash,
  );
  if (!extrinsic || !hasPayoutValidatorInMetadata) {
    await handleRewardByPayoutStakersV2(event, indexer, extrinsic);
    return;
  }

  const leafCalls = await findLeafOriginAndCalls(
    extrinsic.method,
    extrinsic.signer.toString(),
    indexer,
  );
  if (isOnlyPayoutValidator(leafCalls)) {
    await handleRewardByPayoutValidator(event, indexer, extrinsic);
  } else if (isOnlyPayoutNominator(leafCalls)) {
    await handleRewardByPayoutNominator(event, indexer, leafCalls);
  } else {
    await handleRewardByPayoutStakersV2(event, indexer, extrinsic);
  }
}

module.exports = {
  handleRewardWithAccountAndBalance,
};
