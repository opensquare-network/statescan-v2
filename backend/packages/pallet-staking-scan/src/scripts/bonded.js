require("dotenv").config();
const {
  palletStaking: { initPalletStakingScanDb, getStakingRewardCol },
} = require("@statescan/mongo");
const { getBonded } = require("../scan/common/bond");
const { ObjectId } = require("mongodb");

async function query(col) {
  return await col
    .find({
      "dest.controller": { $exists: true },
      bonded: { $exists: false },
    })
    .limit(100)
    .toArray();
}

function isController(dest) {
  return (dest || {})?.hasOwnProperty("controller");
}

async function handleEach(obj, col) {
  const { _id, who, dest, indexer } = obj || {};
  if (who && isController(dest)) {
    const bonded = await getBonded(who, indexer.blockHash);
    await col.findOneAndUpdate({ _id: ObjectId(_id) }, { $set: { bonded } });
  }
}

(async () => {
  await initPalletStakingScanDb();
  const col = await getStakingRewardCol();
  const records = await query(col);
  console.log(`${records.length} records are found`);
  const promises = [];
  for (const record of records) {
    promises.push(handleEach(record));
  }
  await Promise.all(promises);
  console.log("Finished");
  process.exit(0);
})();
