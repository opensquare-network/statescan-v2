const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

const blockValidatorsMap = {};

async function getBlockValidators(blockHash) {
  const cachedValue = blockValidatorsMap[blockHash];
  if (cachedValue) {
    return cachedValue;
  }

  const blockApi = await findBlockApi(blockHash);
  const storage = await blockApi.query.session?.validators();
  const validators = storage.toJSON();
  blockValidatorsMap[blockHash] = validators;
  return validators;
}

function clearBlockValidators(blockHash) {
  delete blockValidatorsMap[blockHash];
}

module.exports = {
  getBlockValidators,
  clearBlockValidators,
};
