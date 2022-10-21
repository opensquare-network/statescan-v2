const {
  queryFinalizedBlocks,
} = require("../../../common/queryFinalizedBlocks");
const {
  queryUnFinalizedBlocks,
} = require("../../../common/queryUnFinalizedBlocks");
const { extractPage } = require("../../../utils");
const {
  block: { getBlockCollection },
} = require("@statescan/mongo");

async function getBlocks(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  let items = await queryFinalizedBlocks(page, pageSize);
  const col = await getBlockCollection();
  let total = await col.estimatedDocumentCount();
  if (page <= 0) {
    const unFinalizedItems = await queryUnFinalizedBlocks();
    items = [...unFinalizedItems, ...items];
    total += unFinalizedItems.length;
  }

  ctx.body = {
    items,
    page,
    pageSize,
    total: total,
  };
}

module.exports = {
  getBlocks,
};
