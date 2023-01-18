let latestBlocks = [];
let firstPageBlocks = [];
let latestSignedTransfers = [];

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

module.exports = {
  setLatestBlocks,
  getLatestBlocks,
  getFirstPageBlocks,
  setFirstPageBlocks,
  getLatestSignedTransfers,
  setLatestSignedTransfers,
};
