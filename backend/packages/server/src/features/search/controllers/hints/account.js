const { encodeAddressByChain } = require("../../../../utils/address");
const {
  utils: { isValidAddress },
} = require("@statescan/common");
const {
  account: { getAddressCollection },
} = require("@statescan/mongo");

async function queryAccount(term = "") {
  let address = null;
  if (!isValidAddress(term)) {
    return null;
  }

  address = encodeAddressByChain(term);
  const col = await getAddressCollection();
  const arr = await col.find({ address }).limit(1).toArray();
  return arr.length <= 0 ? null : address;
}

module.exports = {
  queryAccount,
};
