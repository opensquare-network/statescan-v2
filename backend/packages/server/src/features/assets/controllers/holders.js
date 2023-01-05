const { extractPage } = require("../../../utils");
const {
  asset: { getAssetHolderCol },
} = require("@statescan/mongo");

function normalizeHolders(holders) {
  return holders.map((item) => ({
    ...item,
    balance: item.balance.toString(),
  }));
}

async function getAssetHolders(ctx) {
  const { height, assetId } = ctx.params;
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const q = {
    assetId: parseInt(assetId),
    assetHeight: parseInt(height),
    balance: { $ne: 0 },
  };

  const col = await getAssetHolderCol();
  const items = await col
    .aggregate([
      { $match: q },
      { $sort: { balance: -1 } },
      { $skip: page * pageSize },
      { $limit: pageSize },
    ])
    .toArray();

  const total = await col.countDocuments(q);

  ctx.body = {
    items: normalizeHolders(items),
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getAssetHolders,
};
