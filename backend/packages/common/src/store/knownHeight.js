const knownHeightMap = {};

function setKnownHeightMark(height) {
  knownHeightMap[height] = true;
}

function clearKnownHeightMark(height) {
  delete knownHeightMap[height];
}

function hasKnownHeightMark(height) {
  return knownHeightMap[height];
}

module.exports = {
  setKnownHeightMark,
  clearKnownHeightMark,
  hasKnownHeightMark,
};
