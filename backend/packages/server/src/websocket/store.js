let latestBlocks = [];
let firstPageBlocks = [];
let latestSignedTransfers = [];
let popularNftClasses = [];

function getLatestBlocks() {
  return latestBlocks;
}

function setLatestBlocks(blocks = []) {
  latestBlocks = blocks;
}

function getFirstPageBlocks() {
  return firstPageBlocks;
}

function setFirstPageBlocks(blocks = []) {
  firstPageBlocks = blocks;
}

function getLatestSignedTransfers() {
  return latestSignedTransfers;
}

function setLatestSignedTransfers(transfers = []) {
  latestSignedTransfers = transfers;
}

function getPopularNftClasses() {
  return popularNftClasses;
}

function setPopularNftClasses(nftClasses = []) {
  popularNftClasses = nftClasses;
}

module.exports = {
  setLatestBlocks,
  getLatestBlocks,
  getFirstPageBlocks,
  setFirstPageBlocks,
  getLatestSignedTransfers,
  setLatestSignedTransfers,
  getPopularNftClasses,
  setPopularNftClasses,
};
