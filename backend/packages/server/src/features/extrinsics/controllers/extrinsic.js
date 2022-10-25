const { isHash } = require("../../../utils/isHash");
const { HttpError } = require("../../../utils/httpError");
const {
  block: { getExtrinsicCollection, getUnFinalizedExtrinsicCollection },
} = require("@statescan/mongo");

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
  } else if (isHash(indexOrHash)) {
    q = { hash: indexOrHash };
  } else {
    throw new HttpError(400, "Invalid extrinsic id");
  }

  let extrinsic = await findExtrinsic(await getExtrinsicCollection(), q);
  if (!extrinsic) {
    extrinsic = await findExtrinsic(
      await getUnFinalizedExtrinsicCollection(),
      q,
      false,
    );
  }
  if (!extrinsic) {
    throw new HttpError(404, "extrinsic not found");
  }

  ctx.body = extrinsic;
}

module.exports = {
  getExtrinsic,
};
