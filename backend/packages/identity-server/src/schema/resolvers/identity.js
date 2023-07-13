const {
  identity: { getIdentityCol },
} = require("@statescan/mongo");
const {
  utils: { isValidAddress },
} = require("@statescan/common");

async function identity(_, _args) {
  const { account } = _args;
  if (!isValidAddress(account)) {
    return null;
  }

  const col = await getIdentityCol();
  return await col.findOne({ account }, { projection: { _id: 0 } });
}

module.exports = {
  identity,
};
