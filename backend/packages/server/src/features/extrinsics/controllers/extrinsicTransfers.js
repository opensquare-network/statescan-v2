const { normalizeTransfers } = require("../../../common/transfer");
const {
  asset: { getTransferCollection },
} = require("@statescan/mongo");

async function getExtrinsicTransfers(ctx) {
  const { blockHeight, extrinsicIndex } = ctx.params;
  const q = {
    "indexer.blockHeight": parseInt(blockHeight),
    "indexer.extrinsicIndex": parseInt(extrinsicIndex),
  };

  const col = await getTransferCollection();
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort({
      "indexer.blockHeight": 1,
      "indexer.extrinsicIndex": 1,
      "indexer.eventIndex": 1,
    })
    .toArray();

  ctx.body = await normalizeTransfers(items);
}

module.exports = {
  getExtrinsicTransfers,
};
