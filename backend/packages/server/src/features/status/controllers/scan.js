const { isAssetsChain, isUniquesChain } = require("../../../env");
const {
  asset: { getAssetDb },
  block: { getBlockDb },
  uniques: { getUniquesDb },
  runtime: { getRuntimeDb },
} = require("@statescan/mongo");

async function getScanHeights(ctx) {
  const blockDb = await getBlockDb();
  const blockScanHeight = await blockDb.getScanHeight();

  const runtimeDb = await getRuntimeDb();
  const runtimeScanHeight = await runtimeDb.getScanHeight();

  const obj = {
    block: blockScanHeight,
    runtime: runtimeScanHeight,
  };

  if (isAssetsChain()) {
    const assetDb = await getAssetDb();
    Object.assign(obj, { asset: await assetDb.getScanHeight() });
  }

  if (isUniquesChain()) {
    const uniquesDb = await getUniquesDb();
    Object.assign(obj, { uniques: await uniquesDb.getScanHeight() });
  }

  ctx.body = obj;
}

module.exports = {
  getScanHeights,
};
