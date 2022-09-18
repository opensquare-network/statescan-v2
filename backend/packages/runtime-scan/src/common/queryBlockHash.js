const {
  chain: { getProvider },
} = require("@osn/scan-common");

async function queryBlockHash(blockHeight) {
  const provider = await getProvider();
  try {
    return await provider.send("chain_getBlockHash", [blockHeight]);
  } catch (e) {
    console.error("Can not get block hash");
    throw e;
  }
}

module.exports = {
  queryBlockHash,
};
