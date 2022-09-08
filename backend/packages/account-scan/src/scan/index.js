const { bulkUpdateAccounts } = require("../mongo/services/bulkUpdate");
const { getOnChainAccounts } = require("../common/getOnChainAccounts");
const { getAddresses } = require("./store/address");
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

async function updateBlockAccounts(height) {
  const addrs = getAddresses(height)
  if (addrs.length <= 0) {
    return
  }

  const onChainDataArr = await getOnChainAccounts(addrs);
  if (onChainDataArr.length <= 0) {
    return
  }

  await bulkUpdateAccounts(onChainDataArr);
}

async function handleBlock({ block, author, events, height }) {
  const blockIndexer = getBlockIndexer(block);

  // todo: handle account related business in block
  //   1. check balances module events, and save related accounts to block accounts store
  //   2. add block signer to block accounts store
  //   3. check other modules, and store related accounts to block accounts store

  console.log('blockIndexer', blockIndexer);

  await updateBlockAccounts(height);
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
