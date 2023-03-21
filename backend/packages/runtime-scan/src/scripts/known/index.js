require("dotenv").config();
const {
  runtime: { getRuntimeCollection },
} = require("@statescan/mongo");
const {
  mongo: {
    known: { saveKnownHeights },
  },
} = require("@osn/scan-common");

async function getAllVersions() {
  const col = await getRuntimeCollection();
  return await col
    .find({}, { projection: { runtimeVersion: 0, metadata: 0, _id: 0 } })
    .toArray();
}

(async () => {
  const versions = await getAllVersions();
  const heights = versions.map((v) => v.height);
  const uniqueHeights = [...new Set(heights)];
  await saveKnownHeights(uniqueHeights);

  process.exit(0);
})();
