const {
  palletProxy: { getAnnouncementCol },
} = require("@statescan/mongo");
const { normalizeAnnouncement } = require("./common");

async function announcement(_, _args) {
  const { announcementId } = _args;
  const col = await getAnnouncementCol();
  const announcement = await col.findOne(
    { announcementId },
    { projection: { _id: 0 } },
  );
  return normalizeAnnouncement(announcement);
}

module.exports = {
  announcement,
};
