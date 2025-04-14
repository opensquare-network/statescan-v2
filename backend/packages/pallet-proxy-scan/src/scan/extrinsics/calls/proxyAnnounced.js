const {
  chain: { getBlockHash },
  call: { normalizeCall },
} = require("@osn/scan-common");
const {
  getProxySection,
  findProxy,
  findProxyAtHeight,
  generateAnnouncementId,
} = require("../../common");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");
const { queryAnnouncements } = require("./common/query");
const {
  palletProxy: { getAnnouncementCol, getAnnouncementTimelineCol },
} = require("@statescan/mongo");

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

async function handleProxyAnnounced(call, signer, extrinsicIndexer) {
  const { section, method } = call;
  if (getProxySection() !== section || "proxyAnnounced" !== method) {
    return;
  }
  setKnownHeightMark(extrinsicIndexer.blockHeight);

  const delegate = call.args[0].toString();
  const real = call.args[1].toString();
  const forceProxyType = call.args[2].toString();
  const announcementCall = call.args[3];
  const announcementCallHash = call.args[3].hash.toHex();
  const normalizedCall = normalizeCall(announcementCall);
  const announcements = await queryAnnouncements(
    delegate,
    real,
    await getBlockHash(extrinsicIndexer.blockHeight - 1),
  );
  let proxy = await findProxy(real, delegate, forceProxyType, extrinsicIndexer);
  if (!proxy) {
    proxy = await findProxyAtHeight(
      real,
      delegate,
      forceProxyType,
      extrinsicIndexer.blockHeight - 1,
    );
  }

  const removedAnnouncements = announcements.filter((ann) => {
    return (
      ann.real === real &&
      ann.callHash === announcementCallHash &&
      extrinsicIndexer.blockHeight - ann.height >= proxy.delay
    );
  });

  await updateAnnouncementsState(
    delegate,
    removedAnnouncements,
    normalizedCall,
    extrinsicIndexer,
  );

  await insertTimelineItem(delegate, removedAnnouncements, extrinsicIndexer);
}

module.exports = {
  handleProxyAnnounced,
};
