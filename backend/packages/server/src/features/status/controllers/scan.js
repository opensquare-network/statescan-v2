const { isUniquesChain } = require("../../../env");
const {
  asset: { getAssetDb },
  block: { getBlockDb },
  uniques: { getUniquesDb },
  runtime: { getRuntimeDb },
  account: { getAccountDb },
} = require("@statescan/mongo");

async function getScanHeights(ctx) {
  const blockDb = await getBlockDb();
  const blockScanHeight = await blockDb.getScanHeight();

  const runtimeScanHeight = await getRuntimeDb().getScanHeight();
  const assetsScanHeight = await getAssetDb().getScanHeight();
  const accountScanHeight = await getAccountDb().getScanHeight();

  const obj = {
    block: blockScanHeight,
    runtime: runtimeScanHeight,
    assets: assetsScanHeight,
    account: accountScanHeight,
  };

  if (isUniquesChain()) {
    const uniquesDb = getUniquesDb();
    Object.assign(obj, { uniques: await uniquesDb.getScanHeight() });
  }

  ctx.body = obj;
}

module.exports = {
  getScanHeights,
};
