const { queryBlockHash } = require("./queryBlockHash");
const {
  chain: { getProvider },
} = require("@osn/scan-common");

async function getRuntimeVersion(blockHeight) {
  if (!blockHeight) {
    throw new Error(`No blockHeight when query runtime version`);
  }

  const provider = await getProvider();
  const blockHash = await queryBlockHash(blockHeight);
  const runtimeVersion = await provider.send("state_getRuntimeVersion", [
    blockHash,
  ]);
  return {
    height: blockHeight,
    runtimeVersion,
  };
}

module.exports = {
  getRuntimeVersion,
};
