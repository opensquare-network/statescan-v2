const { handleBlock } = require("./block");
const { deleteFrom } = require("./delete");
const {
  vesting: { getVestingDb },
} = require("@statescan/mongo");
const {
  chain: { wrapBlockHandler },
  scan: { oneStepScan },
  utils: { sleep },
} = require("@osn/scan-common");

async function scan() {
  const db = await getVestingDb();
  let toScanHeight = await db.getNextScanHeight();
  await deleteFrom(toScanHeight);

  /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
  while (true) {
    toScanHeight = await oneStepScan(
      toScanHeight,
      wrapBlockHandler(handleBlock),
      false,
    );
    await sleep(1);
  }
}

module.exports = {
  scan,
};
