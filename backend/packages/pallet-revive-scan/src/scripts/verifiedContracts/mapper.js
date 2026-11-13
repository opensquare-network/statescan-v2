function toDate(value) {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function normalizeAddress(value) {
  if (typeof value !== "string") {
    return null;
  }

  const address = value.toLowerCase();
  return /^0x[0-9a-f]{40}$/.test(address) ? address : null;
}

function mapContractListItem(item) {
  const address = normalizeAddress(item?.address?.hash);
  if (!address) {
    return null;
  }

  return {
    address,
    name: item.address.name || null,
    compilerVersion: item.compiler_version || null,
    verifiedAt: toDate(item.verified_at),
    isVerified: item.address.is_verified === true,
  };
}

function mapAdditionalSources(sources) {
  if (!Array.isArray(sources)) {
    return [];
  }

  return sources
    .filter((source) => source && typeof source === "object")
    .map((source) => ({
      filePath: source.file_path || null,
      sourceCode: source.source_code ?? null,
    }));
}

function mapContractDetail(detail, fallbackAddress) {
  const data = detail && typeof detail === "object" ? detail : {};
  const address =
    normalizeAddress(data.address?.hash) || normalizeAddress(fallbackAddress);
  if (!address) {
    return null;
  }

  return {
    address,
    name: data.name || null,
    compilerVersion: data.compiler_version || null,
    language: data.language || null,
    evmVersion: data.evm_version || null,
    optimizationEnabled: data.optimization_enabled ?? null,
    optimizationRuns: data.optimization_runs ?? null,
    licenseType: data.license_type || null,
    isVerified: data.is_verified === true,
    isFullyVerified: data.is_fully_verified === true,
    isPartiallyVerified: data.is_partially_verified === true,
    certified: data.certified === true,
    verifiedAt: toDate(data.verified_at),
    sourceCode: data.source_code ?? null,
    filePath: data.file_path || null,
    additionalSources: mapAdditionalSources(data.additional_sources),
    abi: data.abi ?? null,
    constructorArgs: data.constructor_args ?? null,
    proxyType: data.proxy_type || null,
    implementations: Array.isArray(data.implementations)
      ? data.implementations
      : [],
    sourcifyRepoUrl: data.sourcify_repo_url || null,
    source: "blockscout",
  };
}

function timestamp(value) {
  if (!value) {
    return null;
  }

  const date = toDate(value);
  return date ? date.getTime() : null;
}

function sameVerifiedAt(left, right) {
  return timestamp(left) === timestamp(right);
}

module.exports = {
  toDate,
  normalizeAddress,
  mapContractListItem,
  mapContractDetail,
  sameVerifiedAt,
};
