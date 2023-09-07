const {
  normalizeIdentity,
  normalizeSubsInfo,
  emptySubs,
} = require("../../utils");
const { getSuperOfMap } = require("./superOf");
const { getIdentityMap } = require("./identityOf");
const { getSubsOfMap } = require("./subsOf");
const {
  identity: { getIdentityCol },
} = require("@statescan/mongo");
const {
  chain: { getLatestHeight },
} = require("@osn/scan-common");

function bulkUpsert(bulk, account, info) {
  bulk
    .find({ account })
    .upsert()
    .updateOne({ $set: { ...info } });
}

function extractIdentityAsSub(parentAddress, parentIdentity, display) {
  const parent = normalizeIdentity(parentIdentity);
  const parentDisplay = parent?.info?.display;
  const suffix = display || parentDisplay;
  let fullDisplay = suffix;
  if (parentDisplay) {
    fullDisplay = `${parentDisplay}/${suffix}`;
  }

  return {
    display: display || fullDisplay,
    fullDisplay,
    isSub: true,
    parentAddress,
    parentInfo: parent,
  };
}

async function updateAllIdentities(indexer) {
  const identityMap = await getIdentityMap(indexer);
  const superOfMap = await getSuperOfMap(indexer);
  const subsOfMap = await getSubsOfMap(indexer);

  const allAddresses = [
    ...Object.keys(identityMap),
    ...Object.keys(superOfMap),
  ];
  const col = await getIdentityCol();
  const bulk = col.initializeOrderedBulkOp();
  bulk.find({}).delete();
  for (const address of allAddresses) {
    const identityOf = identityMap[address];
    if (identityOf && identityOf.isSome) {
      const normalizedInfo = normalizeIdentity(identityOf);
      // Deprecated use
      const normalizedSubsInfo = normalizeSubsInfo(subsOfMap[address]);
      // bulk insert this info
      bulkUpsert(bulk, address, { ...normalizedInfo, ...normalizedSubsInfo });
      continue;
    }

    const superOf = superOfMap[address];
    if (!superOf) {
      continue;
    }

    const { parent, name: display } = superOf;
    const parentIdentity = identityMap[parent];
    const infoAsSub = extractIdentityAsSub(parent, parentIdentity, display);
    if (infoAsSub) {
      bulkUpsert(bulk, address, { ...infoAsSub, ...emptySubs });
    }
  }

  if (bulk.length > 0) {
    await bulk.execute();
  }
}

async function executeUpdateAllIdentitiesJob(indexer) {
  const chainHeight = getLatestHeight();
  const height = indexer.blockHeight;
  if (height > chainHeight - 50 && height % 100 === 0) {
    await updateAllIdentities(indexer);
  }
}

module.exports = {
  updateAllIdentities,
  executeUpdateAllIdentitiesJob,
};
