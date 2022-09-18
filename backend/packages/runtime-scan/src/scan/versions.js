function extractDifferentVersions(versions, originalOne) {
  if (versions.length <= 0) {
    return versions;
  }

  let init = [];
  let original = originalOne;
  if (!originalOne) {
    init.push(versions[0]);
    original = versions[0].runtimeVersion;
  }

  return versions.reduce((result, version) => {
    const runtimeVersion = version.runtimeVersion;
    if (
      original.specName !== runtimeVersion.specName ||
      original.implName !== runtimeVersion.implName ||
      original.authoringVersion !== runtimeVersion.authoringVersion ||
      original.specVersion !== runtimeVersion.specVersion ||
      original.implVersion !== runtimeVersion.implVersion ||
      original.transactionVersion !== runtimeVersion.transactionVersion
    ) {
      result.push(version);
      original = runtimeVersion;
    }

    return result;
  }, init);
}

module.exports = {
  extractDifferentVersions,
};
