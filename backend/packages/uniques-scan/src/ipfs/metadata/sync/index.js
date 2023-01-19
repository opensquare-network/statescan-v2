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

async function syncClassValidToInstance() {
  const classCol = await getClassCol();
  const nftClasses = await classCol.find({}).toArray();

  if (nftClasses.length === 0) {
    return;
  }

  const instanceCol = await getInstanceCol();
  const bulk = instanceCol.initializeUnorderedBulkOp();
  for (const nftClass of nftClasses) {
    bulk
      .find({
        classId: nftClass.classId,
        classHeight: nftClass.classHeight,
      })
      .update({
        $set: {
          classDefinitionValid: nftClass.definitionValid,
          isClassDestroyed: nftClass.isDestroyed,
        },
      });
  }
  await bulk.execute();
}

async function syncParsedData() {
  await syncResourceToMetadata();
  await syncParsedMetadataToNft(await getClassCol());
  await syncParsedMetadataToNft(await getInstanceCol());
  await syncClassValidToInstance();
}

module.exports = {
  syncParsedData,
};
