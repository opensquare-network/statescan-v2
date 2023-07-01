const { handleVestImpl } = require("./vest");
const {
  SECTION: { VESTING },
  EXTRINSIC_METHOD: { VEST_OTHER },
} = require("../../constants");

async function handleVestOther(call, author, extrinsicIndexer) {
  const { section, method } = call;
  if (section !== VESTING || method !== VEST_OTHER) {
    return;
  }

  const from = author;
  const target = call.args[0].toString();
  await handleVestImpl(from, target, extrinsicIndexer);
}

module.exports = {
  handleVestOther,
};
