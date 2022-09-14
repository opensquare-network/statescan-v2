let latestBlocks = [];

function getLatestBlocks() {
  return latestBlocks;
}

function setLatestBlocks(blocks = []) {
  latestBlocks = blocks;
}

module.exports = {
  setLatestBlocks,
  getLatestBlocks,
}
