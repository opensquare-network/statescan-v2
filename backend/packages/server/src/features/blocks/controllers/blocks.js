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

  const finalizedItems = await queryFinalizedBlocks(page, pageSize);
  const unFinalizedItems = await queryUnFinalizedBlocks();
  const col = await getBlockCollection();
  const total = await col.estimatedDocumentCount();

  ctx.body = {
    items: [...unFinalizedItems, ...finalizedItems],
    page,
    pageSize,
    total: total + unFinalizedItems.length,
  };
}

module.exports = {
  getBlocks,
};
