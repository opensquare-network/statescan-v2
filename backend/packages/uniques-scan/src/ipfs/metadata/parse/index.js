const { getDefinition } = require("./definition");
const { busLogger } = require("@osn/scan-common");
const {
  uniques: { getMetadataCol },
} = require("@statescan/mongo");

async function parseMetadata(hash, data) {
  if (!data) {
    throw new Error(`To parse metadata data is null`);
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

  // todo: parse definition resource. Currently we support image and video.
}

module.exports = {
  parseMetadata,
};
