const { handleBlock } = require("./block");
const { deleteFrom } = require("./delete");
const {
  identity: { getIdentityDb },
} = require("@statescan/mongo");
const {
  chain: { wrapBlockHandler },
  scan: { oneStepScan, scanKnownHeights },
  utils: { sleep },
  env: { firstScanKnowHeights },
} = require("@osn/scan-common");

async function scan() {
  const db = await getIdentityDb();
  let toScanHeight = await db.getNextScanHeight();
  await deleteFrom(toScanHeight);

  if (firstScanKnowHeights()) {
    await scanKnownHeights(
      toScanHeight,
      undefined,
      wrapBlockHandler(handleBlock),
    );
    toScanHeight = await db.getNextScanHeight();
  }

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
