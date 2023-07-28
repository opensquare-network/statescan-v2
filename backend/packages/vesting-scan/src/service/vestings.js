const {
  chain: { findBlockApi },
} = require("@osn/scan-common");
const { getCurrentVestingsOf } = require("../mongo");

async function getVestingsFromDb(account) {
  const vestings = await getCurrentVestingsOf(account);
  if (!vestings) {
    return [];
  }
  return vestings;
}

async function getVestingsAtBlock(account, blockHash) {
  const api = await findBlockApi(blockHash);
  const vestings = await api.query.vesting.vesting.storage(account);
  return vestings;
}

module.exports = {
  getVestingsFromDb,
  getVestingsAtBlock,
};
