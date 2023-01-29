const {
  uniques: { getClassCol, getInstanceCol, getMetadataCol },
} = require("@statescan/mongo");

async function markPopulated(col, items) {
  if (items.length <= 0) {
    return;
  }

  const bulk = col.initializeUnorderedBulkOp();
  for (const { dataHash } of items) {
    bulk.find({ dataHash }).update({ $set: { populated: true } });
  }
  await bulk.execute();
}

async function populateCommon(col) {
  let items = await col
    .find({ dataHash: { $ne: null }, populated: null })
    .limit(100)
    .toArray();

  const metadataCol = await getMetadataCol();
  while (items.length > 0) {
    const bulk = metadataCol.initializeUnorderedBulkOp();
    for (const item of items) {
      bulk
        .find({ hash: item.dataHash })
        .upsert()
        .update({
          $setOnInsert: {
            data: item.metadata.data,
            retries: 0,
          },
        });
    }
    await bulk.execute();
    await markPopulated(col, items);

    items = await col
      .find({ dataHash: { $ne: null }, populated: null })
      .limit(100)
      .toArray();
  }
}

// read metadata data from class/instance collection and save them to metadata collection.
// Metadata collection will also host the metadata parsed data.
async function populateMetadata() {
  await populateCommon(await getClassCol());
  console.log("class metadata populated");
  await populateCommon(await getInstanceCol());
  console.log("instance metadata populated");
}

module.exports = {
  populateMetadata,
};
