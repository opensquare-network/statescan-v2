const {
  env: { currentChain },
} = require("@osn/scan-common");
const {
  commonNecessarySections,
  chainsNeedToClean,
} = require("../../common/consts");

function getEventWithCleanedArgs(normalizedEvent) {
  const { section } = normalizedEvent || {};
  if (
    commonNecessarySections.includes(section) ||
    !chainsNeedToClean.includes(currentChain())
  ) {
    return normalizedEvent;
  }

  return {
    ...(normalizedEvent || {}),
    args: null,
  };
}

module.exports = {
  getEventWithCleanedArgs,
};
