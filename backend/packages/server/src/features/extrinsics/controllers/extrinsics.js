const { extractPage } = require("../../../utils");
const {
  block: { getExtrinsicCollection },
} = require("@statescan/mongo");

async function getExtrinsics(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const { section, method, signed_only: signedOnly } = ctx.query;
  const q = {};
  if (section) {
    q.section = section;
  }
  if (method) {
    q.name = method;
  }
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
  const total = await col.estimatedDocumentCount();

  ctx.body = {
    items,
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getExtrinsics,
};
