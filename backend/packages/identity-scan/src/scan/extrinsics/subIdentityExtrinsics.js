const { getIdentityStorage } = require("../utils/getIdentityStorage");
const {
  getSubIdentitiesCollection,
  getIdentityTimelineCollection,
} = require("@statescan/mongo/src/identity");
const { hexToString } = require("../utils/unitConversion");

async function handleSubIdentityExtrinsics(
  author,
  extrinsicData,
  indexer,
  method,
) {
  const parentIdentityAccountId = author.toString();
  const parentIdentity = await getIdentityStorage(parentIdentityAccountId);
  let subIdentityList = [];

  if (extrinsicData.sub && extrinsicData.data) {
    let subAccountId = extrinsicData.sub.id;
    let data = extrinsicData.data;
    const subIdentity = processSubIdentity(
      subAccountId,
      data,
      parentIdentity,
      method,
      indexer,
    );
    subIdentityList.push(subIdentity);
  }

  if (extrinsicData.subs) {
    let subs = extrinsicData.subs;
    subs.forEach(([subAccountId, data]) => {
      const subIdentity = processSubIdentity(
        subAccountId,
        data,
        parentIdentity,
        method,
        indexer,
      );
      subIdentityList.push(subIdentity);
    });
  }
  await bulkUpdateSubIdentities(subIdentityList, parentIdentityAccountId);
  await bulkInsertIdentityTimeline(
    subIdentityList,
    parentIdentityAccountId,
    indexer,
  );
}

function processSubIdentity(
  subAccountId,
  data,
  parentIdentity,
  method,
  indexer,
) {
  const hex = data.raw;
  const subDisplay = hexToString(hex);
  let subIdentity = JSON.parse(JSON.stringify(parentIdentity));
  subIdentity.indexer = indexer;
  subIdentity.accountId = subAccountId;
  subIdentity.subIdentityAccountId = subAccountId;
  subIdentity.method = method;
  subIdentity.info.display = subDisplay;
  return subIdentity;
}

async function bulkUpdateSubIdentities(
  subIdentityList,
  parentIdentityAccountId,
) {
  const subIdentityCollection = await getSubIdentitiesCollection();

  const operations = subIdentityList.map((subIdentity) => ({
    updateOne: {
      filter: { _id: subIdentity.accountId },
      update: {
        $set: {
          ...subIdentity,
          parentIdentityAccountId: parentIdentityAccountId,
        },
      },
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
