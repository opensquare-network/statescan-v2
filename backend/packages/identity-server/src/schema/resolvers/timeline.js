const {
  identity: { getIdentityTimelineCol },
} = require("@statescan/mongo");
const {
  utils: { isValidAddress },
} = require("@statescan/common");

async function timeline(_, _args) {
  const { account } = _args;
  if (!isValidAddress(account)) {
    return [];
  }

  const col = await getIdentityTimelineCol();
  return await col
    .find({ account }, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": 1 })
    .toArray();
}

module.exports = {
  timeline,
};
