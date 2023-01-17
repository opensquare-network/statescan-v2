const Router = require("koa-router");
const { getAssets } = require("./controllers/assets");
const { getAsset } = require("./controllers/asset");
const { getAssetTransfers } = require("./controllers/transfers");
const { getAssetHolders } = require("./controllers/holders");
const { getAssetTimeline } = require("./controllers/timeline");
const { getStatistic } = require("./controllers/statistic");

const router = new Router();
// get active assets
router.get("/assets", getAssets);
router.get("/assets/:assetId(\\d+)", getAsset);
router.get("/assets/:assetId(\\d+)_:height(\\d+)", getAsset);

router.get("/assets/:assetId(\\d+)_:height(\\d+)/transfers", getAssetTransfers);
router.get("/assets/:assetId(\\d+)_:height(\\d+)/holders", getAssetHolders);
router.get("/assets/:assetId(\\d+)_:height(\\d+)/timeline", getAssetTimeline);

router.get("/assets/:assetId(\\d+)_:height(\\d+)/statistic", getStatistic);

module.exports = router;
