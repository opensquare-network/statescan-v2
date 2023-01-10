const { fetchMime } = require("../../axios/mime");
const { createThumbnailFromImageData } = require("./thumbnail");
const { createThumbnailFromVideoData } = require("./video");
const { saveCreateThumbnailError, saveThumbnail } = require("./store");

async function createThumbnailFromIpfsImage(hash, imageCid) {
  let imageType, imageData;
  try {
    const { type, data } = await fetchMime(imageCid);
    imageType = type;
    imageData = data;
  } catch (e) {
    await saveCreateThumbnailError(hash);
    return;
  }

  if (imageType?.mime?.startsWith("video/")) {
    try {
      const { metadata, thumbnail } = await createThumbnailFromVideoData(
        imageCid,
        imageType,
        imageData,
      );
      await saveThumbnail(hash, imageType, metadata, thumbnail);
    } catch (e) {
      await saveCreateThumbnailError(hash, imageType);
    }
    return;
  }

  if (imageType?.mime?.startsWith("image/")) {
    try {
      const { metadata, thumbnail } = await createThumbnailFromImageData(
        imageData,
      );
      await saveThumbnail(hash, imageType, metadata, thumbnail);
    } catch (e) {
      await saveCreateThumbnailError(hash, imageType);
    }
    return;
  }
}

module.exports = {
  createThumbnailFromIpfsImage,
};
