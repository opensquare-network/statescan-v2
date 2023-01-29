const isNil = require("lodash.isnil");
const { getDefinition } = require("./get");
const { busLogger } = require("@osn/scan-common");
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
    busLogger.error(`Get hash ${hash} definition failed, e:`, e.message);
    return;
  }

  let updates = { definitionValid };
  if (definitionValid) {
    updates = { ...updates, definition };
  }
  await col.updateOne({ hash }, { $set: updates });
  console.log(`Metadata ${hash} handled successfully`);
}

async function syncCollectionDefinitionValid(col, items) {
  if (items.length === 0) {
    return;
  }

  const bulk = col.initializeUnorderedBulkOp();
  for (const item of items) {
    let update = {};
    if (isNil(item.definitionValid)) {
      update = { $unset: { definitionValid: true } };
    } else {
      update = { $set: { definitionValid: item.definitionValid } };
    }
    bulk.find({ dataHash: item.hash }).update(update);
  }
  await bulk.execute();
}

async function syncDefinitionValidStatus() {
  const metadataCol = await getMetadataCol();
  let items = await metadataCol.find({}).toArray();

  await syncCollectionDefinitionValid(await getClassCol(), items);
  await syncCollectionDefinitionValid(await getInstanceCol(), items);
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
