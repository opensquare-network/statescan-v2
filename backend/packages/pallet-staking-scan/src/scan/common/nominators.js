const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function getNominator(stash, blockHash) {
  const blockApi = await findBlockApi(blockHash);
  const storageObj = await blockApi.query.staking.nominators(stash);
  if (storageObj.isSome) {
    return storageObj.unwrap().toJSON();
  } else {
    return null;
  }
}

module.exports = {
  getNominator,
};
