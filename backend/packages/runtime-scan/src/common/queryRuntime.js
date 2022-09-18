const {
  chain: { getProvider },
} = require("@osn/scan-common");

async function getRuntimeVersion(blockHeight) {
  if (!blockHeight) {
    throw new Error(`No blockHeight when query runtime version`);
  }

  const provider = await getProvider();
  let blockHash;
  try {
    blockHash = await provider.send("chain_getBlockHash", [blockHeight]);
  } catch (e) {
    console.error("Can not get block hash");
    throw e;
  }

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
