const {
  block: { getExtrinsicCollection }
} = require("@statescan/mongo");

async function getExtrinsic(ctx) {
  const { indexOrHash } = ctx.params;

  let q;
  const match = indexOrHash.match(/(\d+)-(\d+)/);
  if (match) {
    const [, blockHeight, extrinsicIndex] = match;
    q = {
      "indexer.blockHeight": parseInt(blockHeight),
      "indexer.extrinsicIndex": parseInt(extrinsicIndex),
    };
  } else {
    q = { hash: indexOrHash };
  }

  const col = await getExtrinsicCollection();
  ctx.body = await col.findOne(q, { projection: { _id: 0 } });
}

module.exports = {
  getExtrinsic,
}
