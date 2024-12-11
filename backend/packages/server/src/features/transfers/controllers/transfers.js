const { normalizeTransfers } = require("../../../common/transfer");
const { extractPage } = require("../../../utils");
const { getTimeDimension } = require("../../../common/getTimeDimension");
const { getTransferColByChain } = require("../../../common/transfer/col");

async function getTransfers(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const { signed_only: signOnly } = ctx.query;
  const q = {
    ...getTimeDimension(ctx),
  };
  if (signOnly === "true") {
    q.isSigned = true;
  }

  const col = await getTransferColByChain();
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": -1, "indexer.eventIndex": 1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();

  ctx.body = {
    items: await normalizeTransfers(items),
    page,
    pageSize,
  };
}

module.exports = {
  getTransfers,
};
