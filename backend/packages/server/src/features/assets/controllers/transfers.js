const { normalizeTransfers } = require("../../../common/transfer");
const { extractPage } = require("../../../utils");
const {
  asset: { getTransferCollection },
} = require("@statescan/mongo");

async function getAssetTransfers(ctx) {
  const { assetId, height } = ctx.params;
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const q = {
    assetId: parseInt(assetId),
    assetHeight: parseInt(height),
  };
  const col = await getTransferCollection();
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": -1, "indexer.eventIndex": 1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();
  const total = await col.count(q);

  ctx.body = {
    items: await normalizeTransfers(items),
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getAssetTransfers,
};
