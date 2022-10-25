const {
  account: { getAddressCollection },
} = require("@statescan/mongo");

async function bulkUpdateAccounts(accounts = []) {
  if (accounts.length < 1) {
    return;
  }

  const col = await getAddressCollection();
  const bulk = col.initializeUnorderedBulkOp();
  for (const { address, detail } of accounts) {
    bulk
      .find({ address })
      .upsert()
      .updateOne({
        $set: {
          ...detail,
        },
      });
  }

  await bulk.execute();
}

module.exports = {
  bulkUpdateAccounts,
};
