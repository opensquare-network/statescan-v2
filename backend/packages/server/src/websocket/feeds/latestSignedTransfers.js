const util = require("util");
const {
  latestSignedTransfersRoom,
  latestSignedTransfersKey,
  feedInterval,
} = require("../consts");
const {
  getLatestSignedTransfers,
  setLatestSignedTransfers,
} = require("../store");
const {
  asset: { getTransferCollection, getUnFinalizedTransferCol, getAssetCol },
} = require("@statescan/mongo");
const isNil = require("lodash.isnil");

async function queryAssets(assetIds = []) {
  if (assetIds.length <= 0) {
    return [];
  }

  let q;
  if (assetIds.length === 1) {
    q = assetIds[0];
  } else {
    q = { $or: assetIds };
  }

  const col = await getAssetCol();
  return await col.find(q, { projection: { _id: 0 } }).toArray();
}

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

async function query(col, size = 5) {
  const transfers = await col
    .find({ isSigned: true }, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": -1, "indexer.eventIndex": 1 })
    .limit(size)
    .toArray();

  const assetIds = extractAssetIds(transfers);
  const assets = await queryAssets(assetIds);

  return transfers.map((transfer) => {
    if (isNil(transfer.assetId)) {
      return {
        ...transfer,
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
      isNativeAsset: false,
      symbol: asset?.metadata?.symbol,
    };
  });
}

async function queryUnFinalizedTransfers(size = 5) {
  const col = await getUnFinalizedTransferCol();
  return await query(col, size);
}

async function queryTransfers(size = 5) {
  const col = await getTransferCollection();
  return await query(col, size);
}

function normalizeTransfer(transfer = {}, isFinalized = true) {
  return {
    ...transfer,
    isFinalized,
  };
}

async function feedLatestSignedTransfers(io) {
  try {
    const oldData = await getLatestSignedTransfers();
    const unFinalizedTransfers = await queryUnFinalizedTransfers();
    const finalizedTransfers = await queryTransfers();
    const transfers = [
      ...unFinalizedTransfers.map((item) => normalizeTransfer(item, false)),
      ...finalizedTransfers.map((item) => normalizeTransfer(item, true)),
    ].slice(0, 5);

    if (util.isDeepStrictEqual(oldData, transfers)) {
      return;
    }

    setLatestSignedTransfers(transfers);
    io.to(latestSignedTransfersRoom).emit(latestSignedTransfersKey, transfers);
  } catch (e) {
    console.error("feed latest signed transfers error:", e);
  } finally {
    setTimeout(feedLatestSignedTransfers.bind(null, io), feedInterval);
  }
}

module.exports = {
  feedLatestSignedTransfers,
};
