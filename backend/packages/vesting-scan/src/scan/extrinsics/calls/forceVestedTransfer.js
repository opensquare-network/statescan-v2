const { parseVestingInfo } = require("./common");
const { handleVestedTransferImpl } = require("./vestedTransfer");

const {
  SECTION: { VESTING },
  EXTRINSIC_METHOD: { FORCE_VESTED_TRANSFER },
} = require("../../constants");

async function handleForceVestedTransfer(call, author, extrinsicIndexer) {
  const { section, method } = call;
  if (section !== VESTING || method !== FORCE_VESTED_TRANSFER) {
    return;
  }

  const from = call.args[0].toString();
  const target = call.args[1].toString();
  const vesting = parseVestingInfo(call.args[2]);
  await handleVestedTransferImpl(from, target, vesting, extrinsicIndexer);
}

module.exports = {
  handleForceVestedTransfer,
};
