const { normalizeIdentity } = require("../../utils");
const { queryMultipleIdentity } = require("../../query");
const { getBlockAccounts } = require("../../../store");
const {
  identity: { getIdentityCol },
} = require("@statescan/mongo");

async function updateBlockIdentities(indexer) {
  const accounts = await getBlockAccounts(indexer.blockHash);
  if (accounts.length <= 0) {
    return;
  }

  const identities = await queryMultipleIdentity(accounts, indexer);
  const col = await getIdentityCol();
  const bulk = col.initializeUnorderedBulkOp();
  for (let index = 0; index < accounts.length; index++) {
    const account = accounts[index];
    const identity = identities[index];
    if (!identity.isSome) {
      bulk.find({ account }).delete();
    } else {
      const normalizedInfo = normalizeIdentity(identity);
      bulk
        .find({ account })
        .upsert()
        .updateOne({ $set: { ...normalizedInfo } });
    }
  }

  await bulk.execute();
}

module.exports = {
  updateBlockIdentities,
};
