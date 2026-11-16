const { extractPage } = require("../../../utils/extractPage");
const {
  palletRevive: { getTokenCol },
} = require("@statescan/mongo");

// The precompile tokens are the ERC20 precompiles of the pallet-assets, the deployed
// contracts are listed only unless the page asks for the precompiles as well.
function includesPrecompile(ctx) {
  const value = String(ctx.query.include_precompile ?? "0").toLowerCase();
  return ["1", "true"].includes(value);
}

// The tokens of the chain, the newest ones first, the same order the contracts list uses.
async function getTokens(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const filter = includesPrecompile(ctx) ? {} : { precompile: { $ne: true } };
  const col = await getTokenCol();
  const items = await col
    .find(filter, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": -1, address: 1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();
  const total = await col.countDocuments(filter);

  ctx.body = {
    items,
    page,
    pageSize,
    total,
    includePrecompile: includesPrecompile(ctx),
  };
}

module.exports = {
  getTokens,
};
