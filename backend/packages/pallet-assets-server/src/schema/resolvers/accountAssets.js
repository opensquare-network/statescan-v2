const {
  palletAsset: { getHolderCol },
} = require("@statescan/mongo");
const { getHoldersWithAssets } = require("./common/holderAssets");

async function accountAssets(_, _args) {
  const { offset, limit, address } = _args;
  if (parseInt(limit) > 100) {
    throw new Error("Over max page size 100");
  }

  const q = { address };
  const col = await getHolderCol();
  const holders = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ assetId: 1 })
    .skip(offset)
    .limit(limit)
    .toArray();
  const total = await col.countDocuments(q);

  return {
    holders: await getHoldersWithAssets(holders),
    offset,
    limit,
    total,
  };
}

module.exports = {
  accountAssets,
};
