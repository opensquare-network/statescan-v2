const { getAnnouncementCol } = require("./db");

async function insertAnnouncementIfNo(obj) {
  const { announcementId } = obj;
  const col = await getAnnouncementCol();
  const maybeInDb = await col.findOne(
    { announcementId },
    { projection: { announcementId: 1 } },
  );
  if (maybeInDb) {
    return;
  }

  await col.insertOne(obj);
}

module.exports = {
  insertAnnouncementIfNo,
};
