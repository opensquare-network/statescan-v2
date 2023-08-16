const { queryIdentityAsSub } = require("../../common");
const {
  normalizeIdentity,
  normalizeSubsInfo,
  emptySubs,
} = require("../../utils");
const { queryMultipleIdentity, queryMultipleSubsOf } = require("../../query");
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
  const accounts = getBlockAccounts(indexer.blockHash);
  if (accounts.length <= 0) {
    return;
  }

  const identities = await queryMultipleIdentity(accounts, indexer);
  const subsArray = await queryMultipleSubsOf(accounts, indexer);
  const col = await getIdentityCol();
  const bulk = col.initializeUnorderedBulkOp();
  let index = 0;
  for (const account of accounts) {
    const identity = identities[index];
    if (identity.isSome) {
      const normalizedInfo = normalizeIdentity(identity);
      const normalizedSubsInfo = normalizeSubsInfo(subsArray[index]);
      bulkUpsert(bulk, account, {
        ...normalizedInfo,
        ...normalizedSubsInfo,
        lastUpdate: indexer,
      });
      index++;
      continue;
    }

    const infoAsSub = await queryIdentityAsSub(account, indexer);
    if (!infoAsSub) {
      bulk.find({ account }).delete();
    } else {
      bulkUpsert(bulk, account, { ...infoAsSub, ...emptySubs });
    }

    index++;
  }

  await bulk.execute();
}

module.exports = {
  updateBlockIdentities,
};
