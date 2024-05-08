const moment = require("moment-timezone");

let lastBlockDate = null;
let lastBlockIndexer = null;

function setLastBlockIndexer(blockIndexer) {
  lastBlockIndexer = blockIndexer;
  lastBlockDate = moment(blockIndexer.blockTime).utc().format("YYYYMMDD");
}

function getLastBlockIndexer() {
  return lastBlockIndexer;
}

function isNewDay(timestamp) {
  if (!lastBlockDate) {
    return false;
  }

  const day = moment(timestamp).utc().format("YYYYMMDD");
  return day !== lastBlockDate;
}

module.exports = {
  setLastBlockIndexer,
  getLastBlockIndexer,
  isNewDay,
};
