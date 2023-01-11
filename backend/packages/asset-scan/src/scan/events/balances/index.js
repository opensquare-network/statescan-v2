const { handleTransfer } = require("./transfer");
const {
  consts: { Modules, BalancesEvents },
} = require("@osn/scan-common");

async function handleBalancesEvent(event) {
  const { section, method } = event;

  if (section !== Modules.Balances) {
    return false;
  }

  if (BalancesEvents.Transfer === method) {
    await handleTransfer(...arguments);
  }
}

module.exports = {
  handleBalancesEvent,
};
