const { getIdentityStorage } = require("../utils/getIdentityStorage");
const {
  getSubIdentitiesCollection,
  getIdentityTimelineCol,
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
  const deposit = parentIdentity.deposit;
  let subIdentityList = [];
  let subIdentityTimelineList = [];

  if (extrinsicData.sub && extrinsicData.data) {
    let subAccountId = extrinsicData.sub.id;
    let data = extrinsicData.data;
    const subIdentity = processSubIdentity(
      subAccountId,
      data,
      parentIdentity,
      method,
      indexer,
      deposit,
    );
    subIdentityList.push(subIdentity);
    const subIdentityTimeline = processSubIdentity(
      subAccountId,
      data,
      null,
      method,
      indexer,
      deposit,
    );
    subIdentityTimelineList.push(subIdentityTimeline);
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
        deposit,
      );
      subIdentityList.push(subIdentity);

      const subIdentityTimeline = processSubIdentity(
        subAccountId,
        data,
        null,
        method,
        indexer,
        deposit,
      );
      subIdentityTimelineList.push(subIdentityTimeline);
    });
  }

  await bulkUpdateSubIdentities(subIdentityList, parentIdentityAccountId);

  await bulkInsertIdentityTimeline(
    subIdentityTimelineList,
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
  deposit,
) {
  const hex = data.raw;
  const subDisplay = hexToString(hex);
  let subIdentity = {};
  if (parentIdentity) {
    subIdentity = JSON.parse(JSON.stringify(parentIdentity));
    subIdentity.info.display = subDisplay;
    subIdentity.deposit = deposit;
  }
  subIdentity.indexer = indexer;
  subIdentity.accountId = subAccountId;
  subIdentity.subIdentityAccountId = subAccountId;
  subIdentity.method = method;
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
  const collection = await getIdentityTimelineCol();

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
