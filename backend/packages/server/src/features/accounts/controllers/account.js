const { HttpError } = require("../../../utils/httpError");
const { normalizeData } = require("./common");
const {
  account: { getAddressCollection },
} = require("@statescan/mongo");

async function getAccount(ctx) {
  const { address } = ctx.params;
  const col = await getAddressCollection();
  const account = await col.findOne({ address }, { projection: { _id: 0 } });
  if (!account) {
    throw new HttpError(404, "account not found");
  }

  ctx.body = {
    ...account,
    data: normalizeData(account.data),
  };
}

module.exports = {
  getAccount,
};
