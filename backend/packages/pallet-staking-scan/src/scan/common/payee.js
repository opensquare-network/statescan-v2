const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function getPayee(stash, blockHash) {
  const blockApi = await findBlockApi(blockHash);
  const storageObj = await blockApi.query.staking.payee(stash);
  return storageObj.toJSON();
}

module.exports = {
  getPayee,
};
