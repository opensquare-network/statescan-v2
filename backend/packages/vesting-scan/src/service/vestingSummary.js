const {
  chain: { findBlockApi },
} = require("@osn/scan-common");
const { getVestings } = require("../store/vestings");

async function getVestingsAtBlock(account, blockHash) {
  const api = await findBlockApi(indexer.blockHash);
  const vestingsMaybe = await api.query.vesting.vesting(account);
  if (vestingsMaybe.isEmpty) {
    return [];
  }
  const vestings = vestingsMaybe.unwrap();
  return vestings.map((v) => ({
    locked: BigInt(v.locked),
    perBlock: BigInt(v.perBlock),
    startingBlock: parseInt(v.startingBlock, 10),
  }));
}

module.exports = {
  generateVestingSummary,
};
