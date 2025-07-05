const { handleRewardByPayoutStakersV2 } = require("./payoutStakersV2");
const {
  call: { findLeafOriginAndCalls },
} = require("@osn/scan-common");
const { handleRewardByPayoutValidator } = require("./payoutValidator");

function isOnlyPayoutValidator(calls = []) {
  return calls.every((call) => call.method === "payoutValidator");
}

function isOnlyPayoutNominator(calls = []) {
  return calls.every((call) => call.method === "payoutNominator");
}

async function handleRewardWithAccountAndBalance(event, indexer, extrinsic) {
  const hasItInMetadata = await hasPayoutValidatorCall(indexer.blockHash);
  if (!extrinsic || !hasItInMetadata) {
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
    // todo: handle Reward event by payoutNominator
  } else {
    await handleRewardByPayoutStakersV2(event, indexer, extrinsic);
  }
}

module.exports = {
  handleRewardWithAccountAndBalance,
};
