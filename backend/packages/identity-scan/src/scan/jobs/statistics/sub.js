const {
  identity: { getIdentityCol },
} = require("@statescan/mongo");

async function figureSubIdentityCount() {
  const col = await getIdentityCol();
  return await col.countDocuments({ isSub: true });
}

module.exports = {
  figureSubIdentityCount,
};
