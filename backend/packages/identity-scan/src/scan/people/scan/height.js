const {
  identity: { getIdentityDb },
} = require("@statescan/mongo");

const peopleChainScanKey = "people-chain-scan-height";
const genesisHeight = 1;

async function getPeopleChainScanHeight() {
  const db = await getIdentityDb();
  const statusCol = await db.getStatusCol();

  const heightInfo = await statusCol.findOne({ name: peopleChainScanKey });
  if (!heightInfo) {
    return genesisHeight;
  } else if (typeof heightInfo.value === "number") {
    return heightInfo.value + 1;
  } else {
    console.error("Scan height value error in DB!");
    process.exit(1);
  }
}

async function updatePeopleChainScanHeight(height) {
  const db = await getIdentityDb();
  const statusCol = await db.getStatusCol();

  await statusCol.updateOne(
    { name: peopleChainScanKey },
    { $set: { value: height } },
    { upsert: true },
  );
}

module.exports = {
  getPeopleChainScanHeight,
  updatePeopleChainScanHeight,
};
