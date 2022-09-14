let latestBlocks = [];
let firstPageBlocks = [];

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

module.exports = {
  setLatestBlocks,
  getLatestBlocks,
  getFirstPageBlocks,
  setFirstPageBlocks,
}
