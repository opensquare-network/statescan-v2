const { dataAsString } = require("../utils");
const { normalizeIdentity } = require("../utils");
const { queryIdentityInfo, querySuperOf } = require("../query");

async function queryIdentityAsSub(account, indexer) {
  const rawSuperOf = await querySuperOf(account, indexer);
  if (!rawSuperOf || !rawSuperOf.isSome) {
    return null;
  }

  const superOf = rawSuperOf.unwrap();
  const parentAddress = superOf[0].toString();
  const display = dataAsString(superOf[1]);
  if (!display) {
    return null;
  }
  let fullDisplay = display;

  const parentIdentity = await queryIdentityInfo(parentAddress, indexer);
  const parent = normalizeIdentity(parentIdentity);
  const parentDisplay = parent?.info?.display;
  if (parentDisplay) {
    fullDisplay = `${parentDisplay}/${display}`;
  }

  return {
    display,
    fullDisplay,
    isSub: true,
    parentAddress,
    parentInfo: parent,
  };
}

module.exports = {
  queryIdentityAsSub,
};
