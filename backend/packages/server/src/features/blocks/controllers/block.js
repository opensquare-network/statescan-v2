const {
  block: { getBlockCollection }
} = require("@statescan/mongo");

async function getBlock(ctx) {
  const { heightOrHash } = ctx.params;

  const q = {};
  if (heightOrHash.startsWith("0x")) {
    q["hash"] = heightOrHash;
  } else {
    q["height"] = parseInt(heightOrHash);
  }

  const col = await getBlockCollection();
  const block = await col.findOne(q);

  ctx.body = {
    ...block,
    isFinalized: true,
  }
}

module.exports = {
  getBlock,
}
