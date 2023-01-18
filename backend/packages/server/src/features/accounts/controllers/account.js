const { HttpError } = require("../../../utils/httpError");
const { normalizeData } = require("./common");
const {
  account: { getAddressCollection },
  asset: { getAssetHolderCol, getTransferCollection },
  block: { getExtrinsicCollection },
} = require("@statescan/mongo");

async function countAccountAssets(address) {
  const col = await getAssetHolderCol();
  return await col.countDocuments({ address });
}

async function countAccountTransfers(address) {
  const col = await getTransferCollection();
  return await col.countDocuments({
    $or: [{ from: address }, { to: address }],
  });
}

async function countAccountExtrinsics(address) {
  const col = await getExtrinsicCollection();
  return await col.countDocuments({ signer: address });
}

async function getAccount(ctx) {
  const { address } = ctx.params;
  const col = await getAddressCollection();
  const account = await col.findOne({ address }, { projection: { _id: 0 } });
  if (!account) {
    throw new HttpError(404, "account not found");
  }

  const assetsCount = await countAccountAssets(address);
  const transfersCount = await countAccountTransfers(address);
  const extrinsicsCount = await countAccountExtrinsics(address);

  ctx.body = {
    ...account,
    data: normalizeData(account.data),
    assetsCount,
    transfersCount,
    extrinsicsCount,
  };
}

module.exports = {
  getAccount,
};
