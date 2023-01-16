const pick = require("lodash.pick");
const { HttpError } = require("../../../utils");
const {
  uniques: { getClassCol, getMetadataCol, getResourceCol },
} = require("@statescan/mongo");

async function getParsedMetadata(dataHash) {
  const metadataCol = await getMetadataCol();
  const metadata = await metadataCol.findOne({ hash: dataHash });
  if (!metadata) {
    return;
  }

  const resourceCol = await getResourceCol();
  const resource = await resourceCol.findOne({
    hash: metadata.definition.imageHash,
  });
  if (!resource) {
    return pick(metadata.definition, ["image", "name", "description"]);
  }

  return {
    ...pick(metadata.definition, ["image", "name", "description"]),
    resource: pick(resource, ["metadata", "thumbnail"]),
  };
}

async function getClassById(ctx) {
  const { classId } = ctx.params;

  const col = await getClassCol();
  const nftClass = await col.findOne({
    classId: parseInt(classId),
    isDestroyed: { $ne: true },
  });

  if (!nftClass) {
    throw new HttpError(404, "NFT Class not found");
  }

  let parsedMetadata;
  if (nftClass.definitionValid) {
    parsedMetadata = await getParsedMetadata(nftClass.dataHash);
  }

  ctx.body = {
    ...nftClass,
    parsedMetadata,
  };
}

async function getClassByIdAndHeight(ctx) {
  const { classId, classHeight } = ctx.params;

  const col = await getClassCol();
  const nftClass = await col.findOne({
    classId: parseInt(classId),
    classHeight: parseInt(classHeight),
  });

  if (!nftClass) {
    throw new HttpError(404, "NFT Class not found");
  }

  let parsedMetadata;
  if (nftClass.definitionValid) {
    parsedMetadata = await getParsedMetadata(nftClass.dataHash);
  }

  ctx.body = {
    ...nftClass,
    parsedMetadata,
  };
}

module.exports = {
  getClassById,
  getClassByIdAndHeight,
};
