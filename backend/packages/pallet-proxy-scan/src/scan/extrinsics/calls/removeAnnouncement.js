const {
  chain: { findBlockApi, getBlockHash },
} = require("@osn/scan-common");
const { getProxySection, generateAnnouncementId } = require("../../common");
const {
  palletProxy: { getAnnouncementCol, getAnnouncementTimelineCol },
} = require("@statescan/mongo");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");

async function queryAnnouncements(who, real, blockHash) {
  const blockApi = await findBlockApi(blockHash);
  const [announcements] = await blockApi.query[getProxySection()].announcements(
    who,
  );
  return announcements
    .filter((a) => a.real.toString() === real)
    .map((a) => a.toJSON());
}

function removedAnnouncementIds(
  delegate,
  preAnnouncements = [],
  nowAnnouncements = [],
) {
  const preIds = preAnnouncements.map((a) =>
    generateAnnouncementId(delegate, a.real, a.callHash, a.height),
  );
  const nowIds = nowAnnouncements.map((a) =>
    generateAnnouncementId(delegate, a.real, a.callHash, a.height),
  );
  return preIds.filter((id) => !nowIds.includes(id));
}

async function markAnnouncementRemovedByIds(removedIds, indexer) {
  const col = await getAnnouncementCol();
  const bulk = col.initializeUnorderedBulkOp();
  for (const announcementId of removedIds) {
    bulk
      .find({ announcementId })
      .updateOne({ $set: { isRemoved: true, removedAt: indexer } });
  }

  if (bulk.length > 0) {
    await bulk.execute();
  }
}

async function insertTimelineByIds(who, removedIds, indexer) {
  const col = await getAnnouncementTimelineCol();
  const bulk = col.initializeUnorderedBulkOp();
  for (const announcementId of removedIds) {
    bulk.insert({
      announcementId,
      name: "Removed",
      args: { who },
      indexer,
    });
  }

  if (bulk.length > 0) {
    await bulk.execute();
  }
}

async function handleRemoveAnnouncement(call, signer, extrinsicIndexer) {
  const { section, method } = call;
  if (getProxySection() !== section || "removeAnnouncement" !== method) {
    return;
  }
  setKnownHeightMark(extrinsicIndexer.blockHeight);

  const real = call.args[0].toString();
  const preBlockAnnouncements = await queryAnnouncements(
    signer,
    real,
    await getBlockHash(extrinsicIndexer.blockHeight - 1),
  );
  const currentBlockAnnouncements = await queryAnnouncements(
    signer,
    real,
    extrinsicIndexer.blockHash,
  );
  const removedIds = removedAnnouncementIds(
    signer,
    preBlockAnnouncements,
    currentBlockAnnouncements,
  );

  await markAnnouncementRemovedByIds(removedIds, extrinsicIndexer);
  await insertTimelineByIds(signer, removedIds, extrinsicIndexer);
}

module.exports = {
  handleRemoveAnnouncement,
};
