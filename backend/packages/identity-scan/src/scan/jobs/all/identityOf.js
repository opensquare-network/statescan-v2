const { getBlockApiConditionally } = require("../../common/api");

async function getIdentityMap(indexer) {
  const blockApi = await getBlockApiConditionally(indexer.blockHash);

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
