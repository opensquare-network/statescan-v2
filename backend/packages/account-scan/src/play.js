require("dotenv").config();

const {
  chain: {
    setSpecHeights,
    fetchBlocks,
  }
} = require("@osn/scan-common");
const { handleBlock } = require("./scan");

async function main() {
  const blockHeights = [
    10987021,
    // 868559,
    // 868596,
  ];

  for (const height of blockHeights) {
    await setSpecHeights([height - 1]);
    const [block] = await fetchBlocks([height], true);
    await handleBlock(block);
  }

  console.log("finished");
  process.exit(0);
}

main().then(console.log);
