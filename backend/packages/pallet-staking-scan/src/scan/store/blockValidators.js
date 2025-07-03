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
  const entries = await blockApi.query.staking.validators.entries();
  const validators = entries.reduce((acc, [storageKey]) => {
    return [...acc, storageKey.args[0].toString()];
  }, []);
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
