const isNil = require("lodash.isnil");
const {
  runtime: { getRuntimeCollection },
} = require("@statescan/mongo");

async function deleteFrom(height) {
  if (isNil(height)) {
    throw new Error(`Can not delete without height`);
  }

  const col = await getRuntimeCollection();
  await col.deleteMany({ height: { $gte: height } });
}

module.exports = {
  deleteFrom,
};
