const {
  syncOneMetadataValidity,
  batchSyncMetadataValidity,
  markSynced,
} = require("./sync");
const { getDefinition } = require("./get");
const {
  uniques: { getMetadataCol, getClassCol, getInstanceCol },
} = require("@statescan/mongo");

async function parseOneDefinition(hash, data) {
  if (!data) {
    throw new Error(`To parse metadata data is null, hash: ${hash}`);
  }

  const col = await getMetadataCol();
  let definitionValid, definition;
  try {
    const { valid, definition: innerDefinition } = await getDefinition(data);
    definitionValid = valid;
    definition = innerDefinition;
  } catch (e) {
    console.error(`Get hash ${hash} definition failed, e:`, e.message);
    return;
  }

  let updates = { definitionValid, validitySynced: false };
  if (definitionValid) {
    updates = { ...updates, definition };
  }
  await col.updateOne({ hash }, { $set: updates });

  await syncOneMetadataValidity(await getClassCol(), hash, definitionValid);
  await syncOneMetadataValidity(await getInstanceCol(), hash, definitionValid);
  console.log(`Metadata ${hash} handled successfully`);
}

async function syncDefinitionValidStatus() {
  const metadataCol = await getMetadataCol();
  let items = await metadataCol
    .find({ validitySynced: false })
    .limit(100)
    .toArray();

  while (items.length > 0) {
    await batchSyncMetadataValidity(await getClassCol(), items);
    await batchSyncMetadataValidity(await getInstanceCol(), items);
    await markSynced(items);
    items = await metadataCol
      .find({ validitySynced: null })
      .limit(100)
      .toArray();
  }
}

// Fetch not parsed metadata from database and save the NFT definition back to database.
async function parseDefinition() {
  const col = await getMetadataCol();
  const q = { definitionValid: null };
  let total = await col.countDocuments(q);
  console.log(`Total ${total} metadata items waiting for parse`);

  let items = await col.find(q).limit(10).toArray();
  while (items.length > 0) {
    await Promise.all(
      items.map((item) => parseOneDefinition(item.hash, item.data)),
    );
    total = await col.countDocuments(q);
    console.log(`${items.length} handled, left ${total} to handle`);
    items = await col.find(q).limit(10).toArray();
  }

  await syncDefinitionValidStatus();
  console.log(`Definition validity status synced to class/instance table`);
}

module.exports = {
  parseDefinition,
  parseOneDefinition,
};
