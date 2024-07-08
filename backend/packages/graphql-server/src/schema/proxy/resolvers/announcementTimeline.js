const {
  palletProxy: { getAnnouncementTimelineCol },
} = require("@statescan/mongo");

async function announcementTimeline(_, _args) {
  const { announcementId } = _args;
  const col = await getAnnouncementTimelineCol();
  return await col
    .find({ announcementId }, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": 1 })
    .toArray();
}

module.exports = {
  proxyAnnouncementTimeline: announcementTimeline,
};
