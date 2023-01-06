const Router = require("koa-router");
const { getAssets } = require("./controllers/assets");
const { getAsset } = require("./controllers/asset");
const { getAssetTransfers } = require("./controllers/transfers");
const { getAssetHolders } = require("./controllers/holders");
const { getAssetTimeline } = require("./controllers/timeline");
const { getStatistic } = require("./controllers/statistic");

const router = new Router();
router.get("/assets", getAssets);
router.get("/asset/:assetId(\\d+)_:height(\\d+)", getAsset);

router.get("/asset/:assetId(\\d+)_:height(\\d+)/transfers", getAssetTransfers);
router.get("/asset/:assetId(\\d+)_:height(\\d+)/holders", getAssetHolders);
router.get("/asset/:assetId(\\d+)_:height(\\d+)/timeline", getAssetTimeline);

router.get("/asset/:assetId(\\d+)_:height(\\d+)/statistic", getStatistic);

module.exports = router;
