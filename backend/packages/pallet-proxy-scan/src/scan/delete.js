const {
  palletProxy: {
    getProxyCol,
    getProxyTimelineCol,
    getAnnouncementCol,
    getAnnouncementTimelineCol,
    getProxyCallCol,
  },
} = require("@statescan/mongo");

async function deleteFrom(height) {
  if (!height) {
    throw new Error("No height given when deleting business");
  }

  const proxyCol = await getProxyCol();
  await proxyCol.deleteMany({ "indexer.blockHeight": { $gte: height } });

  const timelineCol = await getProxyTimelineCol();
  await timelineCol.deleteMany({ "indexer.blockHeight": { $gte: height } });

  const annCol = await getAnnouncementCol();
  await annCol.deleteMany({ "indexer.blockHeight": { $gte: height } });

  const annTimelineCol = await getAnnouncementTimelineCol();
  await annTimelineCol.deleteMany({ "indexer.blockHeight": { $gte: height } });

  const callCol = await getProxyCallCol();
  await callCol.deleteMany({ "indexer.blockHeight": { $gte: height } });
}

module.exports = {
  deleteFrom,
};
