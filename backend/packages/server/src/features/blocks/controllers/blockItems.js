const { extractPage } = require("../../../utils");

async function getBlockItems(col, ctx, sortKey = "indexer.extrinsicIndex") {
  const { heightOrHash } = ctx.params;
  let q;
  if (heightOrHash.startsWith("0x")) {
    q = { "indexer.blockHash": heightOrHash };
  } else {
    q = { "indexer.blockHeight": parseInt(heightOrHash) };
  }

  const { page, pageSize } = extractPage(ctx);
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ [sortKey]: 1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();
  const total = await col.count(q);

  return {
    items,
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getBlockItems,
};
