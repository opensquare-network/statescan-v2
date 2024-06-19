const {
  chain: { getBlockIndexer },
} = require("@osn/scan-common");

async function handleBlock({ block, events }) {
  const blockIndexer = getBlockIndexer(block);
}

module.exports = {
  handleBlock,
};
