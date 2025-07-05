require("dotenv").config();

const {
  chain: { getApi, setSpecHeights, subscribeFinalizedHeight },
} = require("@osn/scan-common");
const { handleBlock } = require("./scan");
const { initEvmWeb3InstanceConditionally } = require("./evm/web3");

async function main() {
  await subscribeFinalizedHeight();
  await initEvmWeb3InstanceConditionally();
  const blockHeights = [5165017];

  const api = await getApi();
  for (const height of blockHeights) {
    await setSpecHeights([height - 1]);

    const blockHash = await api.rpc.chain.getBlockHash(height);
    const block = await api.rpc.chain.getBlock(blockHash);
    const allEvents = await api.query.system.events.at(blockHash);

    await handleBlock(
      {
        height,
        block: block.block,
        events: allEvents,
      },
      false,
    );
  }

  console.log("finished");
  process.exit(0);
}

main().then(console.log);
