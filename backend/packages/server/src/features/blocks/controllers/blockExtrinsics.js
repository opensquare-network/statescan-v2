const { getBlockItems } = require("./blockItems");
const {
  block: { getExtrinsicCollection, getUnFinalizedExtrinsicCollection },
} = require("@statescan/mongo");

async function getBlockExtrinsics(ctx) {
  const finalized = await getBlockItems(await getExtrinsicCollection(), ctx);
  if (finalized.items.length > 0) {
    ctx.body = finalized;
    return;
  }

  ctx.body = await getBlockItems(
    await getUnFinalizedExtrinsicCollection(),
    ctx,
  );
}

module.exports = {
  getBlockExtrinsics,
};
