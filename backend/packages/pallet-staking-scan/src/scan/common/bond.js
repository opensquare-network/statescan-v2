const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function getBonded(stash, blockHash) {
  const blockApi = await findBlockApi(blockHash);
  const storage = await blockApi.query.staking.bonded(stash);
  if (storage.isSome) {
    return storage.toString();
  } else {
    return null;
  }
}

module.exports = {
  getBonded,
};
