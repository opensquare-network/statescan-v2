const { addAddress } = require("./store/address");

async function handleExtrinsics(extrinsics = [], indexer = {}) {
  for (const extrinsic of extrinsics) {
    if (!extrinsic.isSigned) {
      continue
    }

    addAddress(indexer.blockHeight, extrinsic.signer.toString());
  }
}

module.exports = {
  handleExtrinsics,
}
