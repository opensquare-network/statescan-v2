const { getIdentityStorage } = require("../utils/getIdentityStorage");
const {
  getSubIdentitiesCollection,
  getIdentityTimelineCollection,
} = require("@statescan/mongo/src/identity");
const { getCurrentBlockTimestamp } = require("../utils/unitConversion");

async function handleSubIdentityExtrinsics(extrinsic, indexer, method) {
  const parentAccountId = extrinsic.signer.toString();
  const parentIdentity = await getIdentityStorage(parentAccountId);
  const timestamp = await getCurrentBlockTimestamp(indexer);

  let subIdentityList = [];
  const extrinsicData = extrinsic.method.args[0];
  extrinsicData.forEach(([subAccountId, subDisplay]) => {
    let subIdentity = JSON.parse(JSON.stringify(parentIdentity));
    subIdentity.parentIdentityAccountId = parentAccountId;
    subIdentity.requestTimestamp = timestamp;
    subIdentity.accountId = subAccountId.toHuman();
    subIdentity.subIdentityAccountId = subAccountId.toHuman();
    subIdentity.subIdentityStatus = method;
    subIdentity.info.display = subDisplay.asRaw.toUtf8();
    subIdentityList.push(subIdentity);
  });
  console.log(`subIdentityList`, subIdentityList);

  await bulkUpdateSubIdentities(subIdentityList);
  await bulkInsertIdentityTimeline(subIdentityList, parentAccountId, indexer);
}

async function bulkUpdateSubIdentities(subIdentityList) {
  const subIdentityCollection = await getSubIdentitiesCollection();

  const operations = subIdentityList.map((subIdentity) => ({
    updateOne: {
      filter: { _id: subIdentity.accountId },
      update: { $set: subIdentity },
      upsert: true,
    },
  }));

  await subIdentityCollection.bulkWrite(operations);
}

async function bulkInsertIdentityTimeline(
  identityEvents,
  parentAccountId,
  indexer,
) {
  const collection = await getIdentityTimelineCollection();

  //overwrite accountId with parentAccountId because we use parentAccountId as _id in identityTimeline collection
  const eventsWithIndexer = identityEvents.map((event) => ({
    ...event,
    accountId: parentAccountId,
    indexer,
  }));
  await collection.insertMany(eventsWithIndexer);
}

module.exports = {
  handleSubIdentityExtrinsics,
};
