const { isUniquesChain, isAssetsChain } = require("../../../env");
const {
  asset: { getAssetHolderCol },
  block: { getExtrinsicCollection },
  uniques: { getInstanceCol, getInstanceTransferCol },
} = require("@statescan/mongo");
const { getTransferColByChain } = require("../../../common/transfer/col");

async function countAccountAssets(address) {
  const col = await getAssetHolderCol();
  return await col.countDocuments({ address });
}

async function countAccountTransfers(address) {
  const col = await getTransferColByChain();
  return await col.countDocuments({
    $or: [{ from: address }, { to: address }],
  });
}

async function countAccountExtrinsics(address) {
  const col = await getExtrinsicCollection();
  return await col.countDocuments({ signer: address });
}

async function countAccountNftInstances(address) {
  const col = await getInstanceCol();
  return await col.countDocuments({
    "details.owner": address,
    isDestroyed: false,
  });
}

async function countAccountNftTransfers(address) {
  const col = await getInstanceTransferCol();
  return await col.countDocuments({
    $or: [{ from: address }, { to: address }],
  });
}

async function getCounts(address) {
  const transfersCount = await countAccountTransfers(address);
  const extrinsicsCount = await countAccountExtrinsics(address);

  let assetCounts = {};
  if (isAssetsChain()) {
    const assetsCount = await countAccountAssets(address);
    assetCounts = { assetsCount };
  }

  let nftCounts = {};
  if (isUniquesChain()) {
    const nftInstancesCount = await countAccountNftInstances(address);
    const nftTransfersCount = await countAccountNftTransfers(address);
    nftCounts = {
      nftInstancesCount,
      nftTransfersCount,
    };
  }

  return {
    transfersCount,
    extrinsicsCount,
    ...assetCounts,
    ...nftCounts,
  };
}

async function getAccountSummary(ctx) {
  const { address } = ctx.params;
  ctx.body = await getCounts(address);
}

module.exports = {
  getCounts,
  getAccountSummary,
};
