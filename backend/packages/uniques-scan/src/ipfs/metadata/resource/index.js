const uniqBy = require("lodash.uniqby");
const parseDataURL = require("data-urls");
const {
  uniques: { getMetadataCol, getResourceCol },
} = require("@statescan/mongo");
const { isCid } = require("../../utils/isCid");
const { createThumbnailFromIpfsImage } = require("./ipfs");
const { createThumbnailFromDataUrl } = require("./dataUrl");
const { markMetadataResourceProcessed } = require("./store");

const MAX_PARSE_RETRIES = 5;

async function checkIfResourceNeedParse(hash) {
  const col = await getResourceCol();
  const exists = await col.findOne({ hash });

  if (!exists) {
    return true;
  }

  if (exists.thumbnailParseError) {
    return false;
  }

  return exists.retries <= MAX_PARSE_RETRIES;
}

async function parseOneResource(imageHash, image) {
  if (!imageHash || !image) {
    return;
  }

  // Check if resource need parsed
  const need = await checkIfResourceNeedParse(imageHash);
  if (!need) {
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
  console.log(`Image ${imageHash} handled successfully`);
}

async function getToParseItems() {
  const col = await getMetadataCol();
  const total = await col.countDocuments({
    definitionValid: true,
    resourceProcessed: { $ne: true },
  });
  console.log(`Total ${total} metadata resource items waiting for parse`);
  return await col
    .find({ definitionValid: true, resourceProcessed: { $ne: true } })
    .limit(10)
    .toArray();
}

/**
 * NFT can be images, videos, voices, etc. We support images and videos, and generate thumbnail in this package.
 */
async function parseResource() {
  let items = await getToParseItems();

  while (items.length > 0) {
    const images = uniqBy(
      items.map((item) => item.definition),
      (v) => v.imageHash,
    );
    await Promise.all(
      images.map((item) => parseOneResource(item.imageHash, item.image)),
    );

    items = await getToParseItems();
  }
}

module.exports = {
  parseResource,
  parseOneResource,
};
