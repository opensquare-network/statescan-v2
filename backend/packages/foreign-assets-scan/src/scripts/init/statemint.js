require("dotenv").config();
const {
  foreignAsset: { getForeignAssetDb },
} = require("@statescan/mongo");

(async () => {
  const db = await getForeignAssetDb();
  await db.updateScanHeight(4160197);
  process.exit(0);
})();
