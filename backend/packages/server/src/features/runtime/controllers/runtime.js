const {
  runtime: { getRuntimeCollection },
} = require("@statescan/mongo");

async function getRuntime(ctx) {
  const { version, height } = ctx.params;
  const col = await getRuntimeCollection();
  ctx.body = await col.findOne({
    height: parseInt(height),
    "runtimeVersion.specVersion": parseInt(version),
  });
}

module.exports = {
  getRuntime,
};
