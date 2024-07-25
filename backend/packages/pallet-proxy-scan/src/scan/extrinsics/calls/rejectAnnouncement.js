const { getProxySection } = require("../../common");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");
const { getRemovedAnnouncementIds } = require("./common/getRemovedIds");
const {
  palletProxy: { getAnnouncementCol, getAnnouncementTimelineCol },
} = require("@statescan/mongo");

async function markAnnouncementRejectedByIds(removedIds, indexer) {
  const col = await getAnnouncementCol();
  const bulk = col.initializeUnorderedBulkOp();
  for (const announcementId of removedIds) {
    bulk
      .find({ announcementId })
      .updateOne({
        $set: { isFinal: true, state: "Rejected", rejectedAt: indexer },
      });
  }

  if (bulk.length > 0) {
    await bulk.execute();
  }
}

async function insertTimelineByIds(removedIds, indexer) {
  const col = await getAnnouncementTimelineCol();
  const bulk = col.initializeUnorderedBulkOp();
  for (const announcementId of removedIds) {
    bulk.insert({
      announcementId,
      name: "Rejected",
      args: {},
      indexer,
    });
  }

  if (bulk.length > 0) {
    await bulk.execute();
  }
}

async function handleRejectAnnouncement(call, signer, extrinsicIndexer) {
  const { section, method } = call;
  if (getProxySection() !== section || "rejectAnnouncement" !== method) {
    return;
  }
  setKnownHeightMark(extrinsicIndexer.blockHeight);

  const delegate = call.args[0].toString();
  const removedIds = await getRemovedAnnouncementIds(
    delegate,
    signer,
    extrinsicIndexer,
  );
  await markAnnouncementRejectedByIds(removedIds, extrinsicIndexer);
  await insertTimelineByIds(removedIds, extrinsicIndexer);
}

module.exports = {
  handleRejectAnnouncement,
};
