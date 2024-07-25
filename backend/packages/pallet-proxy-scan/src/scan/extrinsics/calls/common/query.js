const {
  chain: { findBlockApi },
} = require("@osn/scan-common");
const { getProxySection } = require("../../../common");

async function queryAnnouncements(who, real, blockHash) {
  const blockApi = await findBlockApi(blockHash);
  const [announcements] = await blockApi.query[getProxySection()].announcements(
    who,
  );
  return announcements
    .filter((a) => a.real.toString() === real)
    .map((a) => a.toJSON());
}

module.exports = {
  queryAnnouncements,
};
