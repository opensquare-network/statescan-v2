function normalizeData({ total, free, reserved, miscFrozen, feeFrozen }) {
  return {
    total: total.toString(),
    free: free.toString(),
    reserved: reserved.toString(),
    miscFrozen: miscFrozen.toString(),
    feeFrozen: feeFrozen?.toString() || 0,
  };
}

module.exports = {
  normalizeData,
};
