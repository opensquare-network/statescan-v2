function normalizeAnnouncement(item = {}) {
  if (!item) {
    return item;
  }

  return {
    ...item,
    delegator: item.real,
    delegatee: item.delegate,
  };
}

function normalizeProxyCall(item = {}) {
  if (!item) {
    return item;
  }

  return {
    ...item,
    delegator: item.real,
    delegatee: item.delegate,
  };
}

module.exports = {
  normalizeAnnouncement,
  normalizeProxyCall,
};
