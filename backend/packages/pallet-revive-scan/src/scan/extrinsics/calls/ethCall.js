const { u8aToHex } = require("@polkadot/util");
const { getReviveSection } = require("../../common/section");
const { saveCall } = require("./common/saveCall");

// revive.ethCall(dest, value, weightLimit, ethGasLimit, data, ...)
async function handleEthCall(call, signer, extrinsicIndexer, isSuccess) {
  const { section, method } = call;
  if (getReviveSection() !== section || "ethCall" !== method) {
    return;
  }

  const [dest, , , , data] = call.args;
  await saveCall({
    section,
    method,
    caller: signer,
    dest: dest?.toHex(),
    data: data ? u8aToHex(data.toU8a(true)) : null,
    indexer: extrinsicIndexer,
    isSuccess,
  });
}

module.exports = {
  handleEthCall,
};
