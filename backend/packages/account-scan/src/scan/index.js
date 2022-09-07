const {
  chain: {
    getBlockIndexer,
  },
  scan: {
    oneStepScan,
  },
  utils: {
    sleep,
  },
  mongo: {
    scan: {
      getNextScanHeight, updateScanHeight
    }
  }
} = require("@osn/scan-common");

async function handleBlock({ block, author, events, height }) {
  const blockIndexer = getBlockIndexer(block);
  // todo: handle account related business in block

  console.log('blockIndexer', blockIndexer);

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
