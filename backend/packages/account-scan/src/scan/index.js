const { bulkDeleteAccounts } = require("../mongo/services/bulkDelete");
const { handleEvents } = require("./events");
const { bulkUpdateAccounts } = require("../mongo/services/bulkUpdate");
const { getOnChainAccounts } = require("../common/getOnChainAccounts");
const { getAddresses, addAddress, clearAddresses } = require("./store/address");
const { handleExtrinsics } = require("./extrinsic");
const {
  chain: { getBlockIndexer },
  scan: { oneStepScan },
  utils: { sleep },
} = require("@osn/scan-common");
const {
  account: { getAccountDb },
} = require("@statescan/mongo");

async function updateBlockAccounts(height) {
  const addrs = getAddresses(height);
  if (addrs.length <= 0) {
    return;
  }

  const { notExistedAddrs, existedAddrs } = await getOnChainAccounts(addrs);
  await bulkUpdateAccounts(existedAddrs);
  await bulkDeleteAccounts(notExistedAddrs);
  clearAddresses(height);
}

async function handleBlock({ block, author, events, height }) {
  const blockIndexer = getBlockIndexer(block);

  // todo: handle account related business in block
  //   1. check other modules, and store related accounts to block accounts store
  if (author) {
    addAddress(height, author);
  }
  await handleExtrinsics(block.extrinsics, blockIndexer);
  await handleEvents(events, blockIndexer);

  await updateBlockAccounts(height);
  const db = getAccountDb();
  await db.updateScanHeight(height);
}

async function scan() {
  const db = getAccountDb();
  let toScanHeight = await db.getNextScanHeight();

  /*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
  while (true) {
    toScanHeight = await oneStepScan(toScanHeight, handleBlock);
    await sleep(1);
  }
}

module.exports = {
  handleBlock,
  scan,
};
