const { extractPage } = require("../../../utils");
const {
  block: { getBlockCollection },
} = require("@statescan/mongo");

async function queryBlocks(page, pageSize) {
  const col = await getBlockCollection();
  return await col
    .find({}, { projection: { digest: 0, _id: 0 } })
    .sort({ height: -1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();
}

async function getBlocks(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const items = await queryBlocks(page, pageSize);
  const col = await getBlockCollection();
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
  queryBlocks,
};
