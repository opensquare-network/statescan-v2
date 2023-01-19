const {
  uniques: { getResourceCol, getMetadataCol },
} = require("@statescan/mongo");

async function markMetadataResourceProcessed(hash) {
  const metadataCol = await getMetadataCol();
  await metadataCol.updateMany(
    { "definition.imageHash": hash },
    {
      $set: {
        resourceProcessed: true,
      },
    },
  );
}

async function saveThumbnail(hash, type, metadata, thumbnail) {
  const resourceCol = await getResourceCol();
  await resourceCol.updateOne(
    { hash },
    {
      $set: {
        type,
        metadata,
        thumbnail,
      },
      $unset: {
        thumbnailParseError: true,
        retries: true,
      },
    },
    { upsert: true },
  );

  await markMetadataResourceProcessed(hash);
}

async function saveCreateThumbnailError(hash, type) {
  const col = await getResourceCol();
  await col.updateOne(
    { hash },
    {
      $set: {
        type,
        thumbnailParseError: true,
      },
    },
    { upsert: true },
  );

  await markMetadataResourceProcessed(hash);
}

async function increaseCreateThumbnailRetries(hash, type) {
  const col = await getResourceCol();
  await col.updateOne(
    { hash },
    {
      $set: {
        type,
      },
      $inc: {
        retries: 1,
      },
    },
    { upsert: true },
  );
}

module.exports = {
  saveThumbnail,
  saveCreateThumbnailError,
  increaseCreateThumbnailRetries,
  markMetadataResourceProcessed,
};
