const parseDataURL = require("data-urls");
const {
  uniques: { getMetadataCol, getResourceCol },
} = require("@statescan/mongo");
const { isCid } = require("../../utils/isCid");
const { createThumbnailFromIpfsImage } = require("./ipfs");
const { createThumbnailFromDataUrl } = require("./dataUrl");

async function parseOneResource(imageHash, image) {
  if (!imageHash || !image) {
    return;
  }

  const col = await getResourceCol();
  const resource = await col.findOne({ hash: imageHash });

  if (resource?.thumbnail || resource?.error) {
    return;
  }

  if (await isCid(image)) {
    return await createThumbnailFromIpfsImage(imageHash, image);
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
  let items = await col.find({ definitionValid: true }).toArray();
  await Promise.all(
    items.map((item) =>
      parseOneResource(item.definition.imageHash, item.definition.image),
    ),
  );
}

module.exports = {
  parseResource,
};
