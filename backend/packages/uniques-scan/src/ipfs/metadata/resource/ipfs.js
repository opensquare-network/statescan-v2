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
    console.log(`Mime fetched for ${imageCid}. Got type: ${type}`);
  } catch (e) {
    console.error(`fetchMime fetch for ${imageCid}.`, e.message);
    await saveCreateThumbnailError(hash, imageType);
    return;
  }

  if (imageType?.startsWith("video/")) {
    try {
      const { metadata, thumbnail } = await createThumbnailFromVideoData(
        imageCid,
        imageData,
      );
      await saveThumbnail(hash, imageType, metadata, thumbnail);
    } catch (e) {
      await saveCreateThumbnailError(hash, imageType);
    }
    return;
  }

  if (imageType?.startsWith("image/")) {
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
