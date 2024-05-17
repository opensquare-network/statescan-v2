const { setProxyHeightMark } = require("../../../store/proxy");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");

async function handleCancelRecovered(call, signer, extrinsicIndexer) {
  setKnownHeightMark(extrinsicIndexer.blockHeight);
  setProxyHeightMark(extrinsicIndexer.blockHeight);
}

module.exports = {
  handleCancelRecovered,
};
