const { extractDifferentVersions } = require("./versions");
const { getRuntimeVersion } = require("../common/queryRuntime");
const {
  chain: { getLatestFinalizedHeight, getMetaScanHeight, updateSpecs },
  utils: { sleep },
  env: { getScanStep, isUseMetaDb },
  logger,
} = require("@osn/scan-common");
const last = require("lodash.last");

let latestVersion = null;

async function oneStepScan(startHeight) {
  // todo: delete runtime from startHeight
  const chainHeight = getLatestFinalizedHeight();
  if (startHeight > chainHeight) {
    // Just wait if the to scan height greater than current chain height
    await sleep(3000);
    return startHeight;
  }

  let targetHeight = chainHeight;
  const step = getScanStep();
  if (startHeight + step < chainHeight) {
    targetHeight = startHeight + step;
  }

  if (isUseMetaDb()) {
    if (targetHeight > getMetaScanHeight()) {
      await updateSpecs();
    }
  }

  const heights = [];
  for (let i = startHeight; i <= targetHeight; i++) {
    heights.push(i);
  }

  const promises = heights.map((height) => getRuntimeVersion(height));
  const versions = await Promise.all(promises);
  const differentVersions = extractDifferentVersions(
    versions,
    latestVersion?.runtimeVersion,
  );
  // todo: insert different versions

  if (versions.length > 0) {
    latestVersion = versions[versions.length - 1];
  }

  const lastHeight = last(versions || []).height;
  logger.info(`${lastHeight} scan finished!`);
  return lastHeight + 1;
}

module.exports = {
  oneStepScan,
};
