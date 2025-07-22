const { normalizeTransfers } = require("../../../common/transfer");
const { extractPage } = require("../../../utils");
const { getTransferColByChain } = require("../../../common/transfer/col");
const { getAddressQuery } = require("../../../common/getAddressQuery");

async function getAccountTransfers(ctx) {
  const { address } = ctx.params;
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const q = {
    $or: [getAddressQuery("from", address), getAddressQuery("to", address)],
  };
  if (ctx.query.from) {
    q["$and"] = [getAddressQuery("from", ctx.query.from)];
  }
  const col = await getTransferColByChain();
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": -1, "indexer.eventIndex": 1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();
  const total = await col.countDocuments(q);

  ctx.body = {
    items: await normalizeTransfers(items),
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getAccountTransfers,
};
