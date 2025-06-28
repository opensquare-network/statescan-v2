const {
  env: { currentChain },
} = require("@osn/scan-common");
const { isSimpleMode } = require("../../../env");
const {
  commonNecessarySections,
  chainsNeedToClean,
} = require("../../common/consts");

function getCleanedInSimpleMode(normalizedExtrinsic) {
  const { section } = normalizedExtrinsic || {};
  if (
    commonNecessarySections.includes(section) ||
    !chainsNeedToClean.includes(currentChain())
  ) {
    return normalizedExtrinsic;
  }

  return {
    ...(normalizedExtrinsic || {}),
    args: null,
  };
}

function getCleanedExtrinsic(normalizedExtrinsic) {
  const { call } = normalizedExtrinsic || {};

  let cleanedCall = call || {};
  const { section } = cleanedCall;
  if (
    commonNecessarySections.includes(section) ||
    !chainsNeedToClean.includes(currentChain())
  ) {
    return normalizedExtrinsic;
  }

  return {
    ...normalizedExtrinsic,
    call: {
      ...cleanedCall,
      args: null,
    },
  };
}

function getExtrinsicWithCleanedArgs(normalizedExtrinsic) {
  if (isSimpleMode()) {
    return getCleanedInSimpleMode(normalizedExtrinsic);
  } else {
    return getCleanedExtrinsic(normalizedExtrinsic);
  }
}

module.exports = {
  getExtrinsicWithCleanedArgs,
};
