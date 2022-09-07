const { getNextScanHeight, updateScanHeight } = require("../mongo/services/status");
const {
  chain: {
    getBlockIndexer,
  },
  scan: {
    oneStepScan,
  },
  utils: {
    sleep,
  }
} = require("@osn/scan-common");

async function handleBlock({ block, author, events, height }) {
  const blockIndexer = getBlockIndexer(block);
  // todo: handle account related business in block

  await updateScanHeight(height);
}

async function scan() {
  let toScanHeight = await getNextScanHeight();

  while (true) {
    toScanHeight = await oneStepScan(toScanHeight, handleBlock)
    await sleep(1);
  }
}

module.exports = {
  handleBlock,
  scan,
}
