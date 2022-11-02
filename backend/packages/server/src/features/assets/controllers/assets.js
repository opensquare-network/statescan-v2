const { extractPage } = require("../../../utils");
const {
  asset: { getAssetCollection },
} = require("@statescan/mongo");

async function getAssets(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const col = await getAssetCollection();
  const items = await col
    .find({}, { projection: { _id: 0 } })
    .sort({ assetId: 1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();
  const normalizedItems = items.map((item) => {
    return {
      ...item,
      data: item.data,
    };
  });
  const total = await col.estimatedDocumentCount();

  ctx.body = {
    items: normalizedItems,
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getAssets,
};
