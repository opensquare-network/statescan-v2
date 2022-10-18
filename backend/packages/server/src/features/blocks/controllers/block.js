const { HttpError } = require("../../../utils/httpError");
const {
  block: { getBlockCollection, getUnFinalizedBlockCollection },
} = require("@statescan/mongo");

async function findBlock(col, q, isFinalized = true) {
  const block = await col.findOne(q, { projection: { _id: 0 } });
  return block ? { ...block, isFinalized } : block;
}

async function getBlock(ctx) {
  const { heightOrHash } = ctx.params;

  const q = {};
  if (heightOrHash.startsWith("0x")) {
    q["hash"] = heightOrHash;
  } else {
    q["height"] = parseInt(heightOrHash);
  }

  let block = await findBlock(await getBlockCollection(), q, true);
  if (!block) {
    block = await findBlock(await getUnFinalizedBlockCollection(), q, false);
  }

  if (!block) {
    throw new HttpError(404, "block not found");
  }

  ctx.body = block;
}

module.exports = {
  getBlock,
};
