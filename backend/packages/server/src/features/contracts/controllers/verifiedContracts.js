const {
  palletRevive: { getVerifiedContractCol },
} = require("@statescan/mongo");
const { HttpError } = require("../../../utils/httpError");

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

async function getVerifiedContract(ctx) {
  const address = normalizeAddress(ctx.params.address);
  if (!address) {
    throw new HttpError(400, "invalid contract address");
  }

  const col = await getVerifiedContractCol();
  const item = await col.findOne(
    { address, isVerified: true },
    {
      projection: {
        _id: 0,
        address: 1,
        name: 1,
        compilerVersion: 1,
        language: 1,
        evmVersion: 1,
        optimizationEnabled: 1,
        optimizationRuns: 1,
        licenseType: 1,
        verifiedAt: 1,
        isFullyVerified: 1,
        isPartiallyVerified: 1,
        filePath: 1,
        sourceCode: 1,
        additionalSources: 1,
        proxyType: 1,
        implementations: 1,
      },
    },
  );
  if (!item) {
    throw new HttpError(404, "verified contract not found");
  }

  ctx.set("Cache-Control", "public, max-age=300");
  ctx.body = {
    ...item,
    name: item.name || null,
    implementations: normalizeImplementations(item.implementations),
  };
}

module.exports = {
  getVerifiedContracts,
  getVerifiedContract,
  toDecoderAbi,
};
