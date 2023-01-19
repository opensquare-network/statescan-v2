const uniqBy = require("lodash.uniqby");
const parseDataURL = require("data-urls");
const {
  uniques: { getMetadataCol, getResourceCol },
} = require("@statescan/mongo");
const { isCid } = require("../../utils/isCid");
const { createThumbnailFromIpfsImage } = require("./ipfs");
const { createThumbnailFromDataUrl } = require("./dataUrl");
const { markMetadataResourceProcessed } = require("./store");

async function checkResourceExistence(hash) {
  const col = await getResourceCol();
  const exists = await col.findOne({ hash });
  return exists !== null;
}

async function parseOneResource(imageHash, image) {
  if (!imageHash || !image) {
    return;
  }

  // Check if resource exists already
  const isExistsAlready = await checkResourceExistence(imageHash);
  if (isExistsAlready) {
    await markMetadataResourceProcessed(imageHash);
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
  const items = await col
    .find({ definitionValid: true, resourceProcessed: { $ne: true } })
    .toArray();

  const images = uniqBy(
    items.map((item) => item.definition),
    (v) => v.imageHash,
  );

  await Promise.all(
    images.map((item) => parseOneResource(item.imageHash, item.image)),
  );
}

module.exports = {
  parseResource,
  parseOneResource,
};
