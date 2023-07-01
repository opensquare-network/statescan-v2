const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function getIdentityMap(indexer) {
  const blockApi = await findBlockApi(indexer.blockHash);

  const entries = await blockApi.query.identity.identityOf.entries();
  return (entries || []).reduce((result, [key, identityOfOption]) => {
    const address = key.args[0].toString();

    if (identityOfOption.isSome) {
      result[address] = identityOfOption;
    }
    return result;
  }, {});
}

module.exports = {
  getIdentityMap,
};
