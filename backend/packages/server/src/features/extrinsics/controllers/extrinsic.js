const {
  block: {
    getExtrinsicCollection,
    getUnFinalizedExtrinsicCollection,
    getEventCollection,
    getCallCollection,
  },
} = require("@statescan/mongo");

async function getExtrinsicEventsCount(blockHeight, extrinsicIndex) {
  const col = await getEventCollection();
  const events = await col
    .find(
      {
        "indexer.blockHeight": blockHeight,
        "indexer.extrinsicIndex": extrinsicIndex,
      },
      { projection: { _id: 0 } },
    )
    .toArray();

  return events.length;
}

async function getExtrinsicCallsCount(blockHeight, extrinsicIndex) {
  const col = await getCallCollection();
  const calls = await col
    .find(
      {
        "indexer.blockHeight": blockHeight,
        "indexer.extrinsicIndex": extrinsicIndex,
      },
      { projection: { _id: 0 } },
    )
    .toArray();

  return calls.length;
}

async function findExtrinsic(col, q, isFinalized = true) {
  const extrinsic = await col.findOne(q, { projection: { _id: 0 } });
  return extrinsic ? { ...extrinsic, isFinalized } : extrinsic;
}

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

  let extrinsic = await findExtrinsic(await getExtrinsicCollection(), q);
  if (!extrinsic) {
    extrinsic = await findExtrinsic(
      await getUnFinalizedExtrinsicCollection(),
      q,
      false,
    );
  }
  ctx.body = extrinsic;
}

module.exports = {
  getExtrinsic,
};
