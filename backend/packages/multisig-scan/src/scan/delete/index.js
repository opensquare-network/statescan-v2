const {
  multisig: {},
} = require("@statescan/mongo");

async function deleteFrom(height) {
  if (!height) {
    throw new Error("No height given when deleting unFinalized transfers");
  }

  // todo: delete business happened above the given height
}

module.exports = {
  deleteFrom,
};
