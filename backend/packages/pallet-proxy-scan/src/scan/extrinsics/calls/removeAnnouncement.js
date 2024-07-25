const { getProxySection } = require("../../common");
const {
  palletProxy: { getAnnouncementCol, getAnnouncementTimelineCol },
} = require("@statescan/mongo");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");
const { getRemovedAnnouncementIds } = require("./common/getRemovedIds");

async function markAnnouncementRemovedByIds(removedIds, indexer) {
  const col = await getAnnouncementCol();
  const bulk = col.initializeUnorderedBulkOp();
  for (const announcementId of removedIds) {
    bulk
      .find({ announcementId })
      .updateOne({
        $set: { isFinal: true, state: "Removed", removedAt: indexer },
      });
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
  const removedIds = await getRemovedAnnouncementIds(
    signer,
    real,
    extrinsicIndexer,
  );

  await markAnnouncementRemovedByIds(removedIds, extrinsicIndexer);
  await insertTimelineByIds(signer, removedIds, extrinsicIndexer);
}

module.exports = {
  handleRemoveAnnouncement,
};
