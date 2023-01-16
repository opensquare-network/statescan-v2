const { extractPage } = require("../../../utils");
const {
  asset: { getAssetHolderCol, getAssetCol, getAssetApprovalCol },
} = require("@statescan/mongo");

async function populateAssetDetails(items) {
  const assetCol = await getAssetCol();

  for (const item of items) {
    item.asset = await assetCol.findOne({
      assetId: item.assetId,
      assetHeight: item.assetHeight,
    });
  }
}

async function populateAssetApproved(items) {
  const approvalCol = await getAssetApprovalCol();

  for (const item of items) {
    const [result] = await approvalCol
      .aggregate([
        {
          $match: {
            assetId: item.assetId,
            assetHeight: item.assetHeight,
            owner: item.address,
          },
        },
        {
          $group: {
            _id: null,
            approved: { $sum: "$amount" },
          },
        },
      ])
      .toArray();

    item.approved = result.approved;
  }
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
