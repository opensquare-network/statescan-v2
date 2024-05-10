const {
  chain: { findBlockApi },
} = require("@osn/scan-common");
const {
  vesting: { getVestingCol },
} = require("@statescan/mongo");
const { getBlockAccounts } = require("../../store/blockAccounts");

async function updateAccountVesting(address, indexer) {
  const col = await getVestingCol();
  const bulk = col.initializeOrderedBulkOp();
  bulk.find({ address }).delete();

  const api = await findBlockApi(indexer.blockHash);
  const optionalStorage = await api.query.vesting.vesting(address);
  if (optionalStorage.isSome) {
    const unwrapped = optionalStorage.unwrap();
    const json = unwrapped.toJSON();
    if (Array.isArray(json)) {
      for (const item of json) {
        bulk.insert({ address, ...item });
      }
    } else {
      bulk.insert({ address, ...json });
    }
  }

  if (bulk.length > 0) {
    await bulk.execute();
  }
}

async function updateAccountsVesting(indexer) {
  const accounts = getBlockAccounts(indexer.blockHash);
  const promises = accounts.map((account) =>
    updateAccountVesting(account, indexer),
  );
  await Promise.all(promises);
}

module.exports = {
  updateAccountsVesting,
};
