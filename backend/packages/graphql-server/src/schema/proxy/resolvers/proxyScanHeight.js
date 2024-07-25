const {
  palletProxy: { getProxyDb },
} = require("@statescan/mongo");

async function proxyScanHeight() {
  const db = await getProxyDb();
  return await db.getScanHeight();
}

module.exports = {
  proxyScanHeight,
};
