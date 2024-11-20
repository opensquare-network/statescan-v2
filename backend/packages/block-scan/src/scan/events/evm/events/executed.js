const {
  call: { findTargetCall, normalizeCall },
  busLogger,
} = require("@osn/scan-common");
const { getEthereumSection } = require("../consts");

async function handleExecuted(event, indexer, extrinsic) {
  const from = event.data[0].toString();
  const to = event.data[1].toString();
  const hash = event.data[2].toString();

  const targetAsMultiCall = findTargetCall(extrinsic.method, (call) => {
    const { section, method, args } = call;
    if (![getEthereumSection()].includes(section)) {
      return false;
    }

    if (!args[0].isEip1559) {
      busLogger.error(
        `Not a eip-1559 ethereum tx at ${indexer.blockHeight}-${indexer.extrinsicIndex}`,
      );
      return false;
    }

    const eip1559 = args[0].asEip1559;
  });
}

module.exports = {
  handleExecuted,
};
