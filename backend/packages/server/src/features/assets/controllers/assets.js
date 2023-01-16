const { isTrue, extractPage } = require("../../../utils");
const {
  asset: { getAssetCol },
} = require("@statescan/mongo");

function extractSort(ctx) {
  const { sort } = ctx.query;
  if ("holders" === sort) {
    return { "detail.accounts": -1 };
  }

  return { assetId: 1 };
}

async function getAssets(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }
  const { destroyed } = ctx.query;

  const sort = extractSort(ctx);
  const q = { destroyed: isTrue(destroyed) };

  const col = await getAssetCol();
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort(sort)
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();

  const total = await col.countDocuments(q);

  ctx.body = {
    items,
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getAssets,
};
