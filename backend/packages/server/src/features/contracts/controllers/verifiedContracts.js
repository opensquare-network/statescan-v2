const {
  palletRevive: { getVerifiedContractCol },
} = require("@statescan/mongo");

function normalizeAddress(value) {
  if (typeof value !== "string") {
    return null;
  }

  const address = value.toLowerCase();
  return /^0x[0-9a-f]{40}$/.test(address) ? address : null;
}

function compactInput(input) {
  const item = {
    name: input?.name || "",
    type: input?.type || "",
  };
  if (Array.isArray(input?.components)) {
    item.components = input.components.map(compactInput);
  }

  return item;
}

// The site only decodes the calldata of state changing calls, so view/pure
// functions and the outputs are left out of the compact abi.
function toDecoderAbi(abi) {
  if (!Array.isArray(abi)) {
    return [];
  }

  return abi
    .filter((item) => item?.type === "function")
    .filter(
      (item) =>
        item.stateMutability !== "view" && item.stateMutability !== "pure",
    )
    .map((item) => ({
      type: "function",
      name: item.name,
      inputs: (item.inputs || []).map(compactInput),
    }));
}

function normalizeImplementations(implementations) {
  if (!Array.isArray(implementations)) {
    return [];
  }

  return implementations
    .map((item) => {
      const address = normalizeAddress(
        item?.address?.hash ||
          item?.address ||
          item?.address_hash ||
          item?.hash,
      );
      return address ? { address, name: item.name || null } : null;
    })
    .filter(Boolean);
}

async function getVerifiedContracts(ctx) {
  const compact = ["1", "true"].includes(
    String(ctx.query.compact || "").toLowerCase(),
  );

  const col = await getVerifiedContractCol();
  const items = await col
    .find(
      { isVerified: true },
      {
        projection: {
          _id: 0,
          address: 1,
          name: 1,
          abi: 1,
          proxyType: 1,
          implementations: 1,
        },
      },
    )
    .sort({ address: 1 })
    .toArray();

  // The collection changes when the sync runs, five minutes of browser caching
  // keeps reloads cheap without hiding a fresh contract for long.
  ctx.set("Cache-Control", "public, max-age=300");

  ctx.body = {
    items: items.map((item) => ({
      address: item.address,
      name: item.name || null,
      abi: compact ? toDecoderAbi(item.abi) : item.abi || [],
      proxyType: item.proxyType || null,
      implementations: normalizeImplementations(item.implementations),
    })),
    total: items.length,
  };
}

module.exports = {
  getVerifiedContracts,
  toDecoderAbi,
};
