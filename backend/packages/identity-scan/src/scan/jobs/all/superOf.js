const { dataAsString } = require("../../utils");
const { getBlockApiConditionally } = require("../../common/api");

async function getSuperOfMap(indexer) {
  const blockApi = await getBlockApiConditionally(indexer.blockHash);
  const entries = await blockApi.query.identity.superOf.entries();
  return (entries || []).reduce((result, [key, superOf]) => {
    const address = key.args[0].toString();

    if (!superOf.isSome) {
      return result;
    }

    const unwrapped = superOf.unwrap();
    const parent = unwrapped[0].toString();
    const name = dataAsString(unwrapped[1]);
    return {
      ...result,
      [address]: {
        parent,
        name,
      },
    };
  }, {});
}

module.exports = {
  getSuperOfMap,
};
