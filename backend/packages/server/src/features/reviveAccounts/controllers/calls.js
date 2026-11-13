const { HttpError } = require("../../../utils/httpError");
const { extractPage } = require("../../../utils/extractPage");
const {
  palletRevive: { getCallCol },
} = require("@statescan/mongo");
const { normalizeEvmAddress } = require("../../../common/evmAddress");
const { getAccountCallerQuery, getSubstrateCallerQuery } = require("../common");

async function getAccountCalls(ctx) {
  const { address } = ctx.params;
  const evmAddress = normalizeEvmAddress(address);
  const q = evmAddress
    ? getAccountCallerQuery(evmAddress, ctx.query.substrateAddress)
    : getSubstrateCallerQuery(address);
  if (!q) {
    throw new HttpError(400, "invalid account address");
  }

  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const col = await getCallCol();
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort({
      "indexer.blockHeight": -1,
      "indexer.extrinsicIndex": -1,
      "indexer.eventIndex": -1,
    })
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
  getAccountCalls,
};
