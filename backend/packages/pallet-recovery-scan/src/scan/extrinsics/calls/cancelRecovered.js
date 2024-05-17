const { setProxyHeightMark } = require("../../../store/proxy");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");
const { getRecoverySection } = require("../../common/section");

async function handleCancelRecovered(call, signer, extrinsicIndexer) {
  const { section, method } = call;
  if (getRecoverySection() !== section || "cancelRecovered" !== method) {
    return;
  }

  setKnownHeightMark(extrinsicIndexer.blockHeight);
  setProxyHeightMark(extrinsicIndexer.blockHeight);
}

module.exports = {
  handleCancelRecovered,
};
