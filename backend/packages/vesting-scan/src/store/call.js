const vestingCalls = [];

function addVestingCall(call) {
  vestingCalls.push(call);
}

function getVestingCalls() {
  return vestingCalls;
}

function clearAllCalls() {
  vestingCalls.length = 0;
}

module.exports = {
  addVestingCall,
  getVestingCalls,
  clearAllCalls,
};
