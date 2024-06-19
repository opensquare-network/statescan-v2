const {
  palletProxy: { getProxyDb },
} = require("@statescan/mongo");
const { deleteFrom } = require("./delete");
const {
  chain: { wrapBlockHandler },
  scan: { oneStepScan },
  utils: { sleep },
} = require("@osn/scan-common");
const { handleBlock } = require("./block");

async function scan() {
  const db = await getProxyDb();
  let toScanHeight = await db.getNextScanHeight();
  await deleteFrom(toScanHeight);

  /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
  while (true) {
    toScanHeight = await oneStepScan(
      toScanHeight,
      wrapBlockHandler(handleBlock),
    );
    await sleep(1);
  }
}

module.exports = {
  scan,
  handleBlock,
};
