const {
  chain: { getApi },
} = require("@osn/scan-common");

async function queryEntries(startKey, num = 1000) {
  const api = await getApi();

  return api.query.system.account.entriesPaged({
    args: [],
    pageSize: num,
    startKey,
  });
}

module.exports = {
  queryEntries,
}
