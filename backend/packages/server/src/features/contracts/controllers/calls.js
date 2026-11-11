const { HttpError } = require("../../../utils/httpError");
const { extractPage } = require("../../../utils/extractPage");
const {
  palletRevive: { getCallCol },
} = require("@statescan/mongo");
const { normalizeContractAddress } = require("../common");

async function getContractCalls(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const address = normalizeContractAddress(ctx.params.address);
  if (!address) {
    throw new HttpError(400, "invalid contract address");
  }

  const q = { dest: address };
  const col = await getCallCol();
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": -1, "indexer.extrinsicIndex": -1 })
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
  getContractCalls,
};
