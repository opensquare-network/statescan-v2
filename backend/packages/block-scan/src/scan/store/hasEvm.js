const hasEvmMap = {};

function markEvmBlock(height) {
  hasEvmMap[height] = true;
}

function clearEvmBlockMark(height) {
  delete hasEvmMap[height];
}

function hasEvmBlockMark(height) {
  return hasEvmMap[height];
}

module.exports = {
  markEvmBlock,
  clearEvmBlockMark,
  hasEvmBlockMark,
};
