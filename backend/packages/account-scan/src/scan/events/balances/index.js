const { addAddress } = require("../../store/address");
const {
  consts: { Modules },
} = require("@osn/scan-common");
const { SingleAccountEvents, TwoAccountEvents } = require("./consts");

async function handleBalancesEvent(event, indexer) {
  const { section, method, data } = event;
  if (section !== Modules.Balances) {
    return;
  }

  if (SingleAccountEvents.includes(method)) {
    addAddress(indexer.blockHeight, data[0].toString())
  } else if (TwoAccountEvents.includes(method)) {
    addAddress(indexer.blockHeight, data[0].toString())
    addAddress(indexer.blockHeight, data[1].toString())
  }
}

module.exports = {
  handleBalancesEvent,
}
