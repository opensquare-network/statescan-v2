const { extractPage } = require("../../../utils");
const {
  block: { getExtrinsicCollection },
} = require("@statescan/mongo");
const { getTimeDimension } = require("../../common");
const { getCallQueryParams } = require("../../../common/getCallParams");

async function getExtrinsics(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const { signed_only: signedOnly } = ctx.query;
  const q = {
    ...getTimeDimension(ctx),
    ...getCallQueryParams(ctx),
  };
  if (signedOnly === "true") {
    q.isSigned = true;
  }

  const col = await getExtrinsicCollection();
  const items = await col
    .find(q, { projection: { nonce: 0, _id: 0, tip: 0, signature: 0 } })
    .sort({ "indexer.blockHeight": -1, "indexer.extrinsicIndex": 1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();

  ctx.body = {
    items,
    page,
    pageSize,
  };
}

module.exports = {
  getExtrinsics,
};
