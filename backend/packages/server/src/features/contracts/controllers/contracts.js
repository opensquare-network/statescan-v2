const { extractPage } = require("../../../utils/extractPage");
const {
  palletRevive: { getContractCol, getCallCol },
} = require("@statescan/mongo");

// The calls of a whole page are counted in one aggregation over the calls of the
// listed contracts, instead of one count per contract.
async function getCallsCountByAddress(addresses) {
  if (addresses.length <= 0) {
    return {};
  }

  const callCol = await getCallCol();
  const counts = await callCol
    .aggregate([
      { $match: { dest: { $in: addresses } } },
      { $group: { _id: "$dest", count: { $sum: 1 } } },
    ])
    .toArray();

  return Object.fromEntries(counts.map(({ _id, count }) => [_id, count]));
}

async function getContracts(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const col = await getContractCol();
  const items = await col
    .find(
      {},
      // The code itself is big and not needed by the list page, its size is enough.
      { projection: { _id: 0, code: 0 } },
    )
    .sort({ "indexer.blockHeight": -1, "indexer.eventIndex": -1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();
  const total = await col.countDocuments();

  const callsCount = await getCallsCountByAddress(
    items.map((item) => item.address),
  );

  ctx.body = {
    items: items.map((item) => ({
      ...item,
      callsCount: callsCount[item.address] ?? 0,
    })),
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getContracts,
};
