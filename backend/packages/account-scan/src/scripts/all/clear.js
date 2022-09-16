const {
  account: { getAddressCollection },
} = require("@statescan/mongo");

async function clearEmptyAccount() {
  const col = await getAddressCollection();
  await col.deleteMany({ "data.total": { $lte: 0 } });
}

module.exports = {
  clearEmptyAccount,
};
