const { extractPage } = require("../../../utils");
const {
  block: { getBlockCollection }
} = require("@statescan/mongo");

async function getBlocks(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const col = await getBlockCollection()
  const items = await col
    .find({})
    .sort({ "height": -1 })
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
  getBlocks,
}
