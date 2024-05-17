const blockProxyMap = {};

function setProxyHeightMark(height) {
  blockProxyMap[height] = true;
}

function clearProxyHeightMark(height) {
  delete blockProxyMap[height];
}

function hasProxyHeightMark(height) {
  return blockProxyMap[height];
}

module.exports = {
  setProxyHeightMark,
  clearProxyHeightMark,
  hasProxyHeightMark,
};
