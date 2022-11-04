const { queryAssets } = require("./queryAssets");
const { extractAssetIds } = require("./extractAssetIds");
const isNil = require("lodash.isnil");

async function normalizeTransfers(transfers = []) {
  const assetIds = extractAssetIds(transfers);
  const assets = await queryAssets(assetIds);

  return transfers.map((transfer) => {
    if (isNil(transfer.assetId)) {
      return {
        ...transfer,
        balance: transfer.balance.toString(),
        isNativeAsset: true,
      };
    }

    const asset = assets.find(
      (asset) =>
        asset.assetId === transfer.assetId &&
        asset.assetHeight === transfer.assetHeight,
    );
    return {
      ...transfer,
      balance: transfer.balance.toString(),
      isNativeAsset: false,
      symbol: asset?.metadata?.symbol,
      decimals: asset?.metadata?.decimals,
    };
  });
}

module.exports = {
  normalizeTransfers,
};
