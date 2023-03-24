const { getRuntimeVersion } = require("../../common/queryRuntime");
const {
  chain: { getBlockIndexer, wrapBlockHandler, findBlockApi },
  scan: { oneStepScan, scanKnownHeights },
  utils: { sleep },
  env: { firstScanKnowHeights },
} = require("@osn/scan-common");

async function handleBlock({ block, events, height }) {
  const blockHash = block.hash.toHex();
  const runtimeVersion = await getRuntimeVersion(height);

  const blockApi = await findBlockApi(blockHash);
  // todo: normalize with pallets
}

module.exports = {
  handleBlock,
};
