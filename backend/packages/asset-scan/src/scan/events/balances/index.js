const {
  consts: { Modules },
} = require("@osn/scan-common");

async function handleBalancesEvent(event, indexer, extrinsic) {
  const { section, method } = event;

  if (section !== Modules.Balances) {
    return false;
  }

  // todo: handle various events
}

module.exports = {
  handleBalancesEvent,
};
