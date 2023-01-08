const { getDefinition } = require("./get");
const { busLogger } = require("@osn/scan-common");
const {
  uniques: { getMetadataCol },
} = require("@statescan/mongo");

async function parseOneMetadata(hash, data) {
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
  await col.updateOne({ hash }, updates);
}

// Fetch not parsed metadata from database and save the NFT definition back to database.
async function parseMetadata() {
  const col = await getMetadataCol();
  let items = await col.find({ definitionValid: null }).toArray();
  await Promise.all(
    items.map((item) => parseOneMetadata(item.dataHash, item.data)),
  );
}

module.exports = {
  parseMetadata,
};
