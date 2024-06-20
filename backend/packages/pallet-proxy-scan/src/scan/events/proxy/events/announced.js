const { generateAnnouncementId } = require("../../../common");
const {
  palletProxy: { insertAnnouncementIfNo, getAnnouncementTimelineCol },
} = require("@statescan/mongo");

async function handleAnnounced(event, indexer) {
  const real = event.data[0].toString();
  const delegate = event.data[1].toString();
  const callHash = event.data[2].toHex();
  const announcementId = generateAnnouncementId(
    delegate,
    real,
    callHash,
    indexer.blockHeight,
  );

  await insertAnnouncementIfNo({
    announcementId,
    delegate,
    real,
    callHash,
    isRemoved: false,
    indexer,
  });

  const timelineCol = await getAnnouncementTimelineCol();
  await timelineCol.insertOne({
    announcementId,
    name: event.method,
    args: {},
    indexer,
  });
}

module.exports = {
  handleAnnounced,
};
