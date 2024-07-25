const { generateProxyId } = require("../../../common/hash");

function getAllProxyIds(delegator, proxies) {
  return proxies.map((definition) => {
    const { delegate, proxyType, delay } = definition;
    return generateProxyId(delegator, delegate, proxyType, delay);
  });
}

module.exports = {
  getAllProxyIds,
};
