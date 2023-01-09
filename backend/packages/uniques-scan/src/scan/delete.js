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

async function commonDelete(col, height) {
  await col.deleteMany({ "indexer.blockHeight": { $gte: height } });
}

async function deleteFrom(height) {
  if (!height) {
    throw new Error("No height given when deleting unFinalized transfers");
  }

  await commonDelete(await getClassCol(), height);
  await commonDelete(await getClassTimelineCol(), height);
  await commonDelete(await getClassAttributeCol(), height);

  await commonDelete(await getInstanceAttributeCol(), height);
  await commonDelete(await getInstanceTimelineCol(), height);
  await commonDelete(await getInstanceTransferCol(), height);
  await commonDelete(await getInstanceCol(), height);
}

module.exports = {
  deleteFrom,
};
