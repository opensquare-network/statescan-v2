const {
  uniques: {
    getClassCol,
    getClassTimelineCol,
    getClassAttributeCol,
    getInstanceCol,
    getInstanceTransferCol,
    getInstanceAttributeCol,
    getInstanceTimelineCol,
  },
} = require("@statescan/mongo");

async function commonDelete(col) {
  await col.deleteMany({ "indexer.blockHeight": { $gte: height } });
}

async function deleteFrom(height) {
  if (!height) {
    throw new Error("No height given when deleting unFinalized transfers");
  }

  await commonDelete(await getClassCol());
  await commonDelete(await getClassTimelineCol());
  await commonDelete(await getClassAttributeCol());

  await commonDelete(await getInstanceAttributeCol());
  await commonDelete(await getInstanceTimelineCol());
  await commonDelete(await getInstanceTransferCol());
  await commonDelete(await getInstanceCol());
}

module.exports = {
  deleteFrom,
};
