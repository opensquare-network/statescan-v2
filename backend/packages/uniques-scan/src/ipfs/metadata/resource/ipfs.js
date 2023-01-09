const { fetchMime } = require("../../axios/mime");
const { createThumbnailFromImageData } = require("./thumbnail");
const { saveCreateThumbnailError, saveThumbnail } = require("./store");

async function createThumbnailFromIpfsImage(hash, imageCid) {
  try {
    const { data: imageData } = await fetchMime(imageCid);
    const { metadata, thumbnail } = await createThumbnailFromImageData(
      imageData,
    );
    await saveThumbnail(hash, metadata, thumbnail);
  } catch (e) {
    await saveCreateThumbnailError(hash);
  }
}

module.exports = {
  createThumbnailFromIpfsImage,
};
