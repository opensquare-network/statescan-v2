const { deleteFrom } = require("./delete");
const { oneStepScan } = require("./oneStep");
const {
  runtime: { getRuntimeDb },
} = require("@statescan/mongo");
const {
  utils: { sleep },
} = require("@osn/scan-common");

async function scan() {
  const db = getRuntimeDb();
  let toScanHeight = await db.getNextScanHeight();
  await deleteFrom(toScanHeight);

  /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
  while (true) {
    toScanHeight = await oneStepScan(toScanHeight);
    await sleep(1);
  }
}

module.exports = {
  scan,
};
