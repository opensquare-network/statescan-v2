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
const { getIdentityStopHeight } = require("./people");

async function scanOriginalChain(stopHeight) {
  const db = await getIdentityDb();
  let toScanHeight = await db.getNextScanHeight();
  await deleteFrom(toScanHeight);
  if (stopHeight && toScanHeight >= stopHeight) {
    return;
  }

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

async function scan() {
  const relayChainStopHeight = getIdentityStopHeight();
  await scanOriginalChain(relayChainStopHeight);

  if (relayChainStopHeight) {
    // todo: scan people chain
  }
}

module.exports = {
  scan,
};
