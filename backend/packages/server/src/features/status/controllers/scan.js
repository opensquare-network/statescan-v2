const { isUniquesChain, currentChain } = require("../../../env");
const {
  asset: { getAssetDb },
  block: { getBlockDb },
  uniques: { getUniquesDb },
  runtime: { getRuntimeDb },
  account: { getAccountDb },
} = require("@statescan/mongo");
const { transferOnBlockChains } = require("../../../utils/consts/chains");

async function getScanHeights(ctx) {
  const blockDb = await getBlockDb();
  const blockScanHeight = await blockDb.getScanHeight();
  const chain = currentChain();

  const runtimeScanHeight = await getRuntimeDb().getScanHeight();
  let assetsScanHeight;
  if (transferOnBlockChains.includes(chain)) {
    assetsScanHeight = blockScanHeight;
  } else {
    assetsScanHeight = await getAssetDb().getScanHeight();
  }
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
