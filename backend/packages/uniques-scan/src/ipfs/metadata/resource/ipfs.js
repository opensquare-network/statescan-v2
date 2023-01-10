const { fetchMime } = require("../../axios/mime");
const { createThumbnailFromImageData } = require("./thumbnail");
const { saveCreateThumbnailError, saveThumbnail } = require("./store");

async function createThumbnailFromIpfsImage(hash, imageCid) {
  let imageType, imageData;
  try {
    const { type, data } = await fetchMime(imageCid);
    imageType = type;
    imageData = data;
  } catch (e) {
    await saveCreateThumbnailError(hash, imageType);
    return;
  }

  try {
    const { metadata, thumbnail } = await createThumbnailFromImageData(
      imageData,
    );
    await saveThumbnail(hash, imageType, metadata, thumbnail);
  } catch (e) {
    await saveCreateThumbnailError(hash, imageType);
  }
}

module.exports = {
  createThumbnailFromIpfsImage,
};
