const {
  palletAsset: { getTransferCol },
} = require("@statescan/mongo");
const isNil = require("lodash.isnil");
const isEmpty = require("lodash.isempty");

async function assetTransfers(_, _args) {
  const { offset, limit, assetId, assetHeight, from, to, address } = _args;
  if (parseInt(limit) > 100) {
    throw new Error("Over max page size 100");
  }

  const q = {};
  if (!isNil(assetId)) {
    Object.assign(q, { assetId });
  }
  if (!isNil(assetHeight)) {
    Object.assign(q, { assetHeight });
  }
  if (!isNil(from)) {
    Object.assign(q, { from });
  }
  if (!isNil(to)) {
    Object.assign(q, { to });
  }
  if (isNil(to) && isNil(from) && !isNil(address)) {
    Object.assign(q, { $or: [{ from: address }, { to: address }] });
  }
  const col = await getTransferCol();
  const transfers = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": -1, "indexer.eventIndex": 1 })
    .skip(offset)
    .limit(limit)
    .toArray();
  let total;
  if (isEmpty(q)) {
    total = await col.estimatedDocumentCount();
  } else {
    total = await col.countDocuments(q);
  }

  return {
    transfers,
    offset,
    limit,
    total,
  };
}

module.exports = {
  assetTransfers,
};
