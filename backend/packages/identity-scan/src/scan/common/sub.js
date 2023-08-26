const { dataAsString } = require("../utils");
const { normalizeIdentity } = require("../utils");
const { queryIdentityInfo, querySuperOf } = require("../query");
const isEmpty = require("lodash.isempty");

async function queryIdentityAsSub(account, indexer) {
  const rawSuperOf = await querySuperOf(account, indexer);
  if (!rawSuperOf || !rawSuperOf.isSome) {
    return null;
  }

  const superOf = rawSuperOf.unwrap();
  const parentAddress = superOf[0].toString();
  const display = dataAsString(superOf[1]);
  if (isEmpty(display)) {
    return null;
  }

  const parentIdentity = await queryIdentityInfo(parentAddress, indexer);
  const parent = normalizeIdentity(parentIdentity);
  const parentDisplay = parent?.info?.display;

  const suffix = display || parentDisplay;
  let fullDisplay = suffix;
  if (parentDisplay) {
    fullDisplay = `${parentDisplay}/${suffix}`;
  }

  return {
    display: display || fullDisplay,
    fullDisplay,
    subDisplay: display,
    isSub: true,
    parentAddress,
    parentInfo: parent,
    lastUpdate: indexer,
  };
}

module.exports = {
  queryIdentityAsSub,
};
