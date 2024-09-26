let isScanPeople = false;

function markScanPeopleChain() {
  isScanPeople = true;
}

function isScanPeopleChain() {
  return isScanPeople;
}

module.exports = {
  markScanPeopleChain,
  isScanPeopleChain,
};
