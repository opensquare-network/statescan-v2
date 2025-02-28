const { deleteFrom } = require("./delete");
const { oneStepScan } = require("./oneStep");
const {
  runtime: { getRuntimeDb },
} = require("@statescan/mongo");
const {
  utils: { sleep },
  env: { currentChain },
} = require("@osn/scan-common");

const cereTestnetMinHeight = 891032;

function fixScanStartHeight(height) {
  if ("cere-testnet" === currentChain() && height < cereTestnetMinHeight) {
    return cereTestnetMinHeight;
  }

  return height;
}

async function scan() {
  const db = getRuntimeDb();
  let toScanHeight = await db.getNextScanHeight();
  toScanHeight = fixScanStartHeight(toScanHeight);
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
