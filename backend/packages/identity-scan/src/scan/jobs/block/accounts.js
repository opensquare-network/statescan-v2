const { queryIdentityAsSub } = require("../../common");
const { normalizeIdentity } = require("../../utils");
const { queryMultipleIdentity } = require("../../query");
const { getBlockAccounts } = require("../../../store");
const {
  identity: { getIdentityCol },
} = require("@statescan/mongo");

function bulkUpsert(bulk, account, info) {
  bulk
    .find({ account })
    .upsert()
    .updateOne({ $set: { ...info } });
}

async function updateBlockIdentities(indexer) {
  const accounts = await getBlockAccounts(indexer.blockHash);
  if (accounts.length <= 0) {
    return;
  }

  const identities = await queryMultipleIdentity(accounts, indexer);
  const col = await getIdentityCol();
  const bulk = col.initializeUnorderedBulkOp();
  let index = 0;
  for (const account of accounts) {
    const identity = identities[index];
    if (identity.isSome) {
      const normalizedInfo = normalizeIdentity(identity);
      bulkUpsert(bulk, account, normalizedInfo);
      index++;
      continue;
    }

    const infoAsSub = await queryIdentityAsSub(account, indexer);
    if (!infoAsSub) {
      bulk.find({ account }).delete();
    } else {
      bulkUpsert(bulk, account, infoAsSub);
    }

    index++;
  }

  await bulk.execute();
}

module.exports = {
  updateBlockIdentities,
};
