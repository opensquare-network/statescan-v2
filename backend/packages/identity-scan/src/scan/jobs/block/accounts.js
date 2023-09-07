const { queryIdentityAsSub } = require("../../common");
const {
  normalizeIdentity,
  normalizeSubsInfo,
  emptySubs,
} = require("../../utils");
const {
  queryMultipleIdentity,
  queryMultipleSubsOf,
  queryMultipleIdentityAsMap,
  queryMultipleSubsAsMap,
} = require("../../query");
const { getBlockAccounts } = require("../../../store");
const {
  identity: { getIdentityCol },
} = require("@statescan/mongo");
const groupBy = require("lodash.groupby");
const { queryMultipleSuperOfAsMap } = require("../../query/supersOf");

function bulkUpsert(bulk, account, info) {
  bulk
    .find({ account })
    .upsert()
    .updateOne({ $set: { ...info } });
}

async function populateSubAccounts(accounts, indexer) {
  const subsArray = await queryMultipleSubsOf(accounts, indexer);
  const allSubAccounts = subsArray.reduce((result, subs) => {
    return [...result, ...subs[1].toJSON()];
  }, []);

  return [...new Set([...accounts, ...allSubAccounts])];
}

async function updateBlockIdentities(indexer) {
  const accounts = getBlockAccounts(indexer.blockHash);
  if (accounts.length <= 0) {
    return;
  }

  const populated = await populateSubAccounts(accounts, indexer);
  const identitiesMap = await queryMultipleIdentityAsMap(populated, indexer);
  const subsMap = await queryMultipleSubsAsMap(populated, indexer);
  const supersMap = await queryMultipleSuperOfAsMap(populated, indexer);
  const {
    true: hasDirectIdentityAccounts = [],
    false: noIdentityAccounts = [],
  } = groupBy(populated, (account) => {
    const identity = identitiesMap[account];
    return identity && identity.isSome;
  });

  const col = await getIdentityCol();
  const bulk = col.initializeOrderedBulkOp();
  for (const account of hasDirectIdentityAccounts) {
    bulk.find({ parentAddress: account, isSub: true }).delete();
    const normalizedInfo = normalizeIdentity(identitiesMap[account]);
    const normalizedSubsInfo = normalizeSubsInfo(subsMap[account], supersMap);
    bulkUpsert(bulk, account, {
      ...normalizedInfo,
      ...normalizedSubsInfo,
      lastUpdate: indexer,
    });
  }

  for (const account of noIdentityAccounts) {
    bulk.find({ parentAddress: account, isSub: true }).delete();
    const infoAsSub = await queryIdentityAsSub(account, indexer, supersMap);
    if (!infoAsSub) {
      bulk.find({ account }).delete();
    } else {
      bulkUpsert(bulk, account, { ...infoAsSub, ...emptySubs });
    }
  }

  await bulk.execute();
}

module.exports = {
  updateBlockIdentities,
  populateSubAccounts,
};
