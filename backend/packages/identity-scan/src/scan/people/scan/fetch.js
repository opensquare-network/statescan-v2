const { getPeopleChainApi } = require("../api/api");
const { fetchBlock } = require("../../common");

async function fetchOneBlock(height) {
  const api = await getPeopleChainApi();
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const blockApi = await api.at(blockHash);

  const [block, events] = await Promise.all([
    fetchBlock(api, blockApi, blockHash),
    blockApi.query.system.events(),
  ]);

  return {
    height,
    block,
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
