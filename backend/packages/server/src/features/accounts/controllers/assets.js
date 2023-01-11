const { populate, populateSum } = require("../../../utils/populate");
const { extractPage } = require("../../../utils");
const {
  asset: { getAssetHolderCol, getAssetCol, getAssetApprovalCol },
} = require("@statescan/mongo");

async function populateAssetDetails(items) {
  return await populate({
    items,
    mapItemKeys: ["assetId", "assetHeight"],
    queryFromCol: await getAssetCol(),
    mapColKeys: ["assetId", "assetHeight"],
    as: "asset",
  });
}

async function populateAssetApproved(items) {
  return await populateSum({
    items,
    mapItemKeys: ["assetId", "assetHeight", "address"],
    queryFromCol: await getAssetApprovalCol(),
    mapColKeys: ["assetId", "assetHeight", "owner"],
    sumField: "amount",
    as: "approved",
  });
}

function normalizeAssets(items) {
  return items.map((item) => ({
    ...item,
    balance: item.balance.toString(),
    approved: item.approved.toString(),
  }));
}

async function getAccountAssets(ctx) {
  const { address } = ctx.params;
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const q = { address };
  const col = await getAssetHolderCol();
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ balance: -1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();
  const total = await col.countDocuments(q);

  await populateAssetDetails(items);
  await populateAssetApproved(items);

  ctx.body = {
    items: normalizeAssets(items),
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getAccountAssets,
};
