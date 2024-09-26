const { getApi } = require("@osn/scan-common/src/chain/api");
const { findBlockApi } = require("@osn/scan-common/src/chain/blockApi");

async function fetchOneBlock(height, doFetchAuthor = false) {
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await findBlockApi(blockHash);
  const promises = [
    await api.rpc.chain.getBlock(blockHash),
    await blockApi.query.system.events(),
  ];

  const [block, events] = await Promise.all(promises);
  return {
    height,
    block: block.block,
    events,
  };
}

async function fetchPeopleChainBlocks(heights = []) {
  const allPromises = [];
  for (const height of heights) {
    allPromises.push(fetchOneBlock(height));
  }

  return await Promise.all(allPromises);
}

module.exports = {
  fetchPeopleChainBlocks,
};
