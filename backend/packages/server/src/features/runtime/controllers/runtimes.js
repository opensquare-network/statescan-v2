const { extractPage } = require("../../../utils");
const {
  runtime: { getRuntimeCollection },
} = require("@statescan/mongo");

function lookupCount(lookup = [], id) {
  const { type } = lookup.types[id] || {};
  const variants = type.def.variant.variants;
  return variants.length;
}

function normalizeRuntime(item) {
  const {
    height,
    runtimeVersion: { specName, specVersion },
    metadata: { lookup = [], pallets = [] },
  } = item || {};

  return {
    startHeight: height,
    specName,
    specVersion,
    count: {
      pallets: pallets.length,
      calls: pallets.reduce((result, pallet) => {
        if (!pallet.calls) {
          return result;
        }

        return result + lookupCount(lookup, pallet.calls.type);
      }, 0),
      events: pallets.reduce((result, pallet) => {
        if (!pallet.events) {
          return result;
        }

        return result + lookupCount(lookup, pallet.events.type);
      }, 0),
      storage: pallets.reduce((result, pallet) => {
        if (!pallet.storage) {
          return result;
        }

        return result + (pallet.storage.items || []).length;
      }, 0),
      constants: pallets.reduce((result, pallet) => {
        return result + (pallet.constants || []).length;
      }, 0),
    },
  };
}

async function getRuntimes(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const col = await getRuntimeCollection();
  const items = await col
    .find({})
    .sort({ height: -1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();
  const total = await col.estimatedDocumentCount();

  ctx.body = {
    items: items.map(normalizeRuntime),
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getRuntimes,
};
