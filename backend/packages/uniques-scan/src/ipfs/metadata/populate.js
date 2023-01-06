const {
  uniques: { getClassCol, getInstanceCol, getMetadataCol },
} = require("@statescan/mongo");

async function populateCommon(col) {
  const items = await col.find({ dataHash: { $ne: null } }).toArray();
  if (items.length <= 0) {
    return;
  }

  const metadataCol = await getMetadataCol();
  const bulk = metadataCol.initializeUnorderedBulkOp();
  for (const item of items) {
    bulk
      .find({ hash: item.dataHash })
      .upsert()
      .update({
        $setOnInsert: {
          data: item.metadata.data,
        },
      });
  }
  await bulk.execute();
}

// read metadata data from class/instance collection and save them to metadata collection.
// Metadata collection will also host the metadata parsed data.
async function populateMetadata() {
  await populateCommon(await getClassCol());
  await populateCommon(await getInstanceCol());
}

module.exports = {
  populateMetadata,
};
