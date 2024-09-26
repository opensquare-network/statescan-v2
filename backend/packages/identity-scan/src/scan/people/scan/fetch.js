const { getApi } = require("@osn/scan-common/src/chain/api");

async function fetchOneBlock(height) {
  const api = await getApi();
  const blockHash = await api.rpc.chain.getBlockHash(height);
  const promises = [
    await api.rpc.chain.getBlock(blockHash),
    await api.query.system.events.at(blockHash),
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
