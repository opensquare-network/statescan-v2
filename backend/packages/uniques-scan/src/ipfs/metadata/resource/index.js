const parseDataURL = require("data-urls");
const {
  uniques: { getMetadataCol },
} = require("@statescan/mongo");
const { isCid } = require("../../utils/isCid");
const { createThumbnailFromIpfsImage } = require("./ipfs");
const { createThumbnailFromDataUrl } = require("./dataUrl");

async function parseOneResource(imageHash, image) {
  if (!imageHash || !image) {
    return;
  }

  if (await isCid(image)) {
    await createThumbnailFromIpfsImage(imageHash, image);
    return;
  }

  const parsedDataUrl = parseDataURL(image);
  if (parsedDataUrl) {
    await createThumbnailFromDataUrl(imageHash, image);
  }
}

/**
 * NFT can be images, videos, voices, etc. We support images and videos, and generate thumbnail in this package.
 */
async function parseResource() {
  const col = await getMetadataCol();
  let items = await col
    .find({ definitionValid: true, resourceProcessed: { $ne: true } })
    .toArray();
  await Promise.all(
    items.map((item) =>
      parseOneResource(item.definition.imageHash, item.definition.image),
    ),
  );
}

module.exports = {
  parseResource,
  parseOneResource,
};
