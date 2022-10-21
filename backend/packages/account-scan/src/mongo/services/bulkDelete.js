const {
  account: { getAddressCollection },
} = require("@statescan/mongo");

async function bulkDeleteAccounts(accounts = []) {
  if (accounts.length < 1) {
    return;
  }

  const col = await getAddressCollection();
  const bulk = col.initializeUnorderedBulkOp();
  for (const address of accounts) {
    bulk.find({ address }).delete();
  }

  await bulk.execute();
}

module.exports = {
  bulkDeleteAccounts,
};
