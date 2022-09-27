const { getBlockItems } = require("./blockItems");
const {
  block: { getExtrinsicCollection },
} = require("@statescan/mongo");

async function getBlockExtrinsics(ctx) {
  ctx.body = await getBlockItems(await getExtrinsicCollection(), ctx);
}

module.exports = {
  getBlockExtrinsics,
};
