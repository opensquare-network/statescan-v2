const { isValidAddressPolkadotAddress } = require("../../../utils/address");
const { addAddress } = require("../../store/address");

async function handleCommonEvent(event, indexer) {
  const { data = [] } = event;
  for (const arg of data) {
    if (!arg.toString) {
      continue
    }

    const argStr = arg.toString();
    if (isValidAddressPolkadotAddress(argStr)) {
      addAddress(indexer.blockHeight, argStr);
    }
  }
}

module.exports = {
  handleCommonEvent,
}
