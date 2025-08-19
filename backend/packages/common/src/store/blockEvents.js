const heightBlockEventsMap = {};

function setBlockEvents(height, blockEvents) {
  heightBlockEventsMap[height] = blockEvents;
}

function getBlockEvents(height) {
  return heightBlockEventsMap[height];
}

function clearBlockEvents(height) {
  delete heightBlockEventsMap[height];
}

module.exports = {
  setBlockEvents,
  getBlockEvents,
  clearBlockEvents,
};
