const sharp = require("sharp");
const { getAverageColor } = require("fast-average-color-node");

async function createImageThumbnail(image, width, height) {
  return image
    .resize({
      fit: sharp.fit.outside,
      width,
      height,
    })
    .png({ compressionLevel: 9, adaptiveFiltering: true, force: true })
    .toBuffer();
}

async function createThumbnailFromImageData(imageData) {
  const sharpImage = sharp(imageData);
  const { size, width, height } = await sharpImage.metadata();

  // create image thumbnail from image data
  const imageThumbnailData = await createImageThumbnail(sharpImage, 32, 32);
  const thumbnail = `data:image/png;base64,${imageThumbnailData.toString(
    "base64",
  )}`;

  const { hex: background } = await getAverageColor(imageThumbnailData);
  const metadata = { size, width, height, background };

  return {
    metadata,
    thumbnail,
  };
}

module.exports = {
  createThumbnailFromImageData,
};
