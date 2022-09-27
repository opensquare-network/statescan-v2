const { extractPage } = require("../../../utils");
const {
  block: { getExtrinsicCollection },
} = require("@statescan/mongo");

async function getBlockExtrinsics(ctx) {
  const { heightOrHash } = ctx.params;
  let q;
  if (heightOrHash.startsWith("0x")) {
    q = { "indexer.blockHash": heightOrHash };
  } else {
    q = { "indexer.blockHeight": heightOrHash };
  }

  const { page, pageSize } = extractPage(ctx);
  const col = await getExtrinsicCollection();
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ "indexer.extrinsicIndex": 1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();
  const total = await col.count(q);

  ctx.body = {
    items,
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getBlockExtrinsics,
};
