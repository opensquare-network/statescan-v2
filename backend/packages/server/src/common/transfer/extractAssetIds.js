const isNil = require("lodash.isnil");

function extractAssetIds(transfers = []) {
  return transfers.reduce((result, transfer) => {
    if (isNil(transfer.assetId)) {
      return result;
    }

    const { assetId, assetHeight } = transfer;
    if (
      result.find(
        (item) => item.assetId === assetId && item.assetHeight === assetHeight,
      )
    ) {
      return result;
    }

    return [...result, { assetId, assetHeight }];
  }, []);
}

module.exports = {
  extractAssetIds,
};
