const { getBonded } = require("../../../../common/bond");

function isController(dest) {
  return (dest || {})?.hasOwnProperty("controller");
}

async function populateBondedIfNeed(rewardObj, blockHash) {
  const { who, dest } = rewardObj || {};
  if (who && isController(dest)) {
    const bonded = await getBonded(who, blockHash);
    return { ...rewardObj, bonded };
  }
  return rewardObj;
}

module.exports = {
  populateBondedIfNeed,
};
