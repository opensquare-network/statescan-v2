const {
  palletRevive: { getContractCol, getCallCol },
} = require("@statescan/mongo");

async function deleteFrom(height) {
  if (!height) {
    throw new Error("No height given when deleting revive business");
  }

  const commonQ = { "indexer.blockHeight": { $gte: height } };

  const contractCol = await getContractCol();
  await contractCol.deleteMany(commonQ);

  const callCol = await getCallCol();
  await callCol.deleteMany(commonQ);
}

module.exports = {
  deleteFrom,
};
