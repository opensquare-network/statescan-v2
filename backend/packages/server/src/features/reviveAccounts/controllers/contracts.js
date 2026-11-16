const { HttpError } = require("../../../utils/httpError");
const { extractPage } = require("../../../utils/extractPage");
const {
  palletRevive: { getContractCol },
} = require("@statescan/mongo");
const { normalizeEvmAddress } = require("../../../common/evmAddress");
const {
  getCallsCountByAddress,
} = require("../../contracts/controllers/contracts");

async function getAccountContracts(ctx) {
  const { address } = ctx.params;
  const evmAddress = normalizeEvmAddress(address);
  if (!evmAddress) {
    throw new HttpError(400, "invalid EVM address");
  }

  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const q = { deployer: evmAddress };
  const col = await getContractCol();
  const items = await col
    .find(
      q,
      // The code itself is big and not needed by the list, its size is enough.
      { projection: { _id: 0, code: 0 } },
    )
    .sort({ "indexer.blockHeight": -1, "indexer.eventIndex": -1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();
  const total = await col.countDocuments(q);

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
  getAccountContracts,
};
