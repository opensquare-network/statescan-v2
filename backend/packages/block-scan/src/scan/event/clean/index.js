const {
  env: { currentChain },
} = require("@osn/scan-common");
const {
  necessaryEventSections,
  chainsNeedToClean,
} = require("../../common/consts");

function getEventWithCleanedArgs(normalizedEvent) {
  const { section } = normalizedEvent || {};
  if (
    necessaryEventSections.includes(section) ||
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
