const {
  multisig: { getMultisigDb },
} = require("@statescan/mongo");
const { deleteFrom } = require("./delete");
const {
  chain: { wrapBlockHandler },
  scan: { oneStepScan, scanKnownHeights },
  utils: { sleep },
  env: { firstScanKnowHeights },
} = require("@osn/scan-common");
const { handleBlock } = require("./block");

async function scan() {
  const db = await getMultisigDb();
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
