const { deleteFrom } = require("./delete");
const { oneStepScan } = require("./oneStep");
const {
  runtime: { getRuntimeDb, getLatestRuntimeVersion },
} = require("@statescan/mongo");
const {
  utils: { sleep },
} = require("@osn/scan-common");

let latestVersion = null;

async function scan() {
  latestVersion = await getLatestRuntimeVersion();
  const db = getRuntimeDb();
  let toScanHeight = await db.getNextScanHeight();
  await deleteFrom(toScanHeight);

  while (true) {
    toScanHeight = await oneStepScan(toScanHeight);
    await sleep(1);
  }
}

module.exports = {
  scan,
};
