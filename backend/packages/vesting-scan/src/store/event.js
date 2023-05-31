const vestingEvents = [];

function addVestingEvent(event) {
  vestingEvents.push(event);
}

function getVestingEvents() {
  return vestingEvents;
}

function clearAllEvents() {
  vestingEvents.length = 0;
}

module.exports = {
  addVestingEvent,
  getVestingEvents,
  clearAllEvents,
};
