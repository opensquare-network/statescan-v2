const issuanceMap = {};

function addIssuance(height, issuance) {
  if (!issuanceMap[height]) {
    issuanceMap[height] = [issuance];
  } else {
    issuanceMap[height].push(issuance);
  }
}

function clearIssuance(height) {
  delete issuanceMap[height];
}

function getBlockIssuance(height) {
  return issuanceMap[height] || [];
}

module.exports = {
  addIssuance,
  getBlockIssuance,
  clearIssuance,
};
