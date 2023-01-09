const {
  uniques: { getResourceCol },
} = require("@statescan/mongo");

async function saveThumbnail(hash, metadata, thumbnail) {
  const col = await getResourceCol();
  await col.updateOne(
    { hash },
    {
      $set: {
        metadata,
        thumbnail,
      },
    },
    { upsert: true },
  );
}

async function saveCreateThumbnailError(hash) {
  const col = await getResourceCol();
  await col.updateOne(
    { hash },
    {
      $set: {
        error: "imageError",
      },
    },
    { upsert: true },
  );
}

module.exports = {
  saveThumbnail,
  saveCreateThumbnailError,
};
