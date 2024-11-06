const { encodeAddressByChain } = require("../../../../utils/address");
const {
  utils: { isValidAddress },
} = require("@statescan/common");

async function queryAccount(term = "") {
  let address = null;
  if (!isValidAddress(term)) {
    return null;
  }

  address = encodeAddressByChain(term);
  return address;
}

module.exports = {
  queryAccount,
};
