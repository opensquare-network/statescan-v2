const {
  chain: { getBlockHash },
} = require("@osn/scan-common");
const { generateAnnouncementId } = require("../../../common");
const { queryAnnouncements } = require("./query");

function calcRemovedIds(
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

async function getRemovedAnnouncementIds(delegate, real, indexer) {
  const preBlockAnnouncements = await queryAnnouncements(
    delegate,
    real,
    await getBlockHash(indexer.blockHeight - 1),
  );
  const currentBlockAnnouncements = await queryAnnouncements(
    delegate,
    real,
    indexer.blockHash,
  );
  return calcRemovedIds(
    delegate,
    preBlockAnnouncements,
    currentBlockAnnouncements,
  );
}

module.exports = {
  getRemovedAnnouncementIds,
};
