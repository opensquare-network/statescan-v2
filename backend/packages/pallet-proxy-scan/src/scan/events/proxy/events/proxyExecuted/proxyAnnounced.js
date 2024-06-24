const {
  chain: { getBlockHash },
} = require("@osn/scan-common");
const {
  queryAnnouncements,
} = require("../../../../extrinsics/calls/common/query");
const { findProxy, generateAnnouncementId } = require("../../../../common");
const {
  palletProxy: { getAnnouncementCol, getAnnouncementTimelineCol },
} = require("@statescan/mongo");
const { normalizeCall } = require("@osn/scan-common/src/extrinsic/call");

async function updateAnnouncementsState(
  delegate,
  announcements = [],
  normalizedCall,
  indexer,
) {
  const col = await getAnnouncementCol();
  const bulk = col.initializeUnorderedBulkOp();
  for (const ann of announcements) {
    const announcementId = generateAnnouncementId(
      delegate,
      ann.real,
      ann.callHash,
      ann.height,
    );
    bulk.find({ announcementId }).updateOne({
      $set: {
        isFinal: true,
        state: "Executed",
        normalizedCall,
        executedAt: indexer,
      },
    });
  }
  if (bulk.length > 0) {
    await bulk.execute();
  }
}

async function insertTimelineItem(delegate, announcements = [], indexer) {
  const col = await getAnnouncementTimelineCol();
  const bulk = col.initializeUnorderedBulkOp();
  for (const ann of announcements) {
    const announcementId = generateAnnouncementId(
      delegate,
      ann.real,
      ann.callHash,
      ann.height,
    );
    bulk.insert({
      announcementId,
      name: "Executed",
      args: {},
      indexer,
    });
  }
  if (bulk.length > 0) {
    await bulk.execute();
  }
}

async function handleProxyAnnouncedCall(event, call, indexer) {
  const delegate = call.args[0].toString();
  const real = call.args[1].toString();
  const forceProxyType = call.args[2].toString();
  const announcementCall = call.args[3];
  const announcementCallHash = call.args[3].hash.toHex();
  const normalizedCall = normalizeCall(announcementCall);

  const announcements = await queryAnnouncements(
    delegate,
    real,
    await getBlockHash(indexer.blockHeight - 1),
  );
  const proxy = await findProxy(real, delegate, forceProxyType, indexer);

  const removedAnnouncements = announcements.filter((ann) => {
    return (
      ann.real === real &&
      ann.callHash === announcementCallHash &&
      indexer.blockHeight - ann.height >= proxy.delay
    );
  });

  await updateAnnouncementsState(
    delegate,
    removedAnnouncements,
    normalizedCall,
    indexer,
  );
  await insertTimelineItem(delegate, removedAnnouncements, indexer);
}

module.exports = {
  handleProxyAnnouncedCall,
};
