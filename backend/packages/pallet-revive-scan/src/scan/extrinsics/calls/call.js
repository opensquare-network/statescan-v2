const { u8aToHex } = require("@polkadot/util");
const { getReviveSection } = require("../../common/section");
const { saveCall } = require("./common/saveCall");

// revive.call(dest, value, weightLimit, storageDepositLimit, data)
async function handleCall(call, signer, extrinsicIndexer, isSuccess) {
  const { section, method } = call;
  if (getReviveSection() !== section || "call" !== method) {
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
  handleCall,
};
