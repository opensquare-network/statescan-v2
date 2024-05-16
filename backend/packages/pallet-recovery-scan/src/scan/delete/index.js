const {
  palletRecovery: { getRecoverableCol },
} = require("@statescan/mongo");

async function deleteFrom(height) {
  if (!height) {
    throw new Error("No height given when deleting business");
  }

  const recoverableCol = await getRecoverableCol();
  await recoverableCol.deleteMany({ height: { $gte: height } });
}

module.exports = {
  deleteFrom,
};
