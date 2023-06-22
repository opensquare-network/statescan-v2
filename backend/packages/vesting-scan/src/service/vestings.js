const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function getVestingsAtBlock(account, blockHash) {
  const api = await findBlockApi(blockHash);
  const vestingsMaybe = await api.query.vesting.vesting(account);
  if (vestingsMaybe.isEmpty) {
    return [];
  }
  const vestings = vestingsMaybe.unwrap();
  return vestings.map((v, i) => ({
    indexder: {
      currentIndex: i,
    },
    locked: BigInt(v.locked),
    perBlock: BigInt(v.perBlock),
    startingBlock: parseInt(v.startingBlock, 10),
  }));
}

module.exports = {
  getVestingsAtBlock,
};
