const {
  utils: { isValidAddress },
} = require("@statescan/common");
const {
  multisig: { getTimelineCol },
} = require("@statescan/mongo");

async function multisigTimeline(_, _args) {
  const { account, callHash, whenHeight, whenExtrinsicIndex } = _args;
  if (!isValidAddress(account)) {
    return [];
  }

  const col = await getTimelineCol();
  const timelineItems = await col
    .find(
      {
        "multisig.id": account,
        "multisig.callHash": callHash,
        "multisig.height": whenHeight,
        "multisig.index": whenExtrinsicIndex,
      },
      { projection: { _id: 0 } },
    )
    .sort({ "indexer.blockHeight": 1 })
    .toArray();

  return timelineItems.map((item) => {
    return {
      multisigAddress: item.multisig.id,
      callHash: item.multisig.callHash,
      whenHeight: item.multisig.height,
      whenExtrinsicIndex: item.multisig.index,
      ...item,
    };
  });
}

module.exports = {
  multisigTimeline,
};
