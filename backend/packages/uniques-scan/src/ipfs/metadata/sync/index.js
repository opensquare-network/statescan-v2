const pick = require("lodash.pick");
const {
  getMetadataCol,
  getResourceCol,
  getClassCol,
  getInstanceCol,
} = require("@statescan/mongo/src/uniques");

async function syncResourceToMetadata() {
  const resourceCol = await getResourceCol();
  const items = await resourceCol.find({}).toArray();

  const metadataCol = await getMetadataCol();
  for (const resource of items) {
    await metadataCol.updateMany(
      { "definition.imageHash": resource.hash },
      { $set: { resource: pick(resource, ["type", "metadata", "thumbnail"]) } },
    );
  }
}

async function syncParsedMetadataToNft(nftCol) {
  const metadataCol = await getMetadataCol();
  const items = await metadataCol.find({}).toArray();

  for (const parsedMetadata of items) {
    let updates = { definitionValid: parsedMetadata.definitionValid };
    if (parsedMetadata.definitionValid) {
      updates = {
        ...updates,
        parsedMetadata: {
          ...pick(parsedMetadata.definition, ["name", "description", "image"]),
          ...pick(parsedMetadata, ["resource"]),
        },
      };
    }
    await nftCol.updateMany(
      { dataHash: parsedMetadata.hash },
      { $set: updates },
    );
  }
}

async function syncParsedData() {
  await syncResourceToMetadata();
  await syncParsedMetadataToNft(await getClassCol());
  await syncParsedMetadataToNft(await getInstanceCol());
}

module.exports = {
  syncParsedData,
};
