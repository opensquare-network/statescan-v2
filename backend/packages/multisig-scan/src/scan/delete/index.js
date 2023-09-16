const {
  multisig: { getMultisigCol, getTimelineCol },
} = require("@statescan/mongo");

async function deleteFrom(height) {
  if (!height) {
    throw new Error("No height given when deleting unFinalized transfers");
  }

  const multisigCol = await getMultisigCol();
  await multisigCol.deleteMany({ "when.height": { $gte: height } });

  const timelineCol = await getTimelineCol();
  await timelineCol.deleteMany({ "indexer.blockHeight": { $gte: height } });
}

module.exports = {
  deleteFrom,
};
