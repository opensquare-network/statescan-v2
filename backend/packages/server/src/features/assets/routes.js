const Router = require("koa-router");
const { getAssets } = require("./controllers/assets");
const { getAsset } = require("./controllers/asset");
const { getAssetTransfers } = require("./controllers/transfers");

const router = new Router();
router.get("/assets", getAssets);
router.get("/asset/:assetId(\\d+)_:height(\\d+)", getAsset);

router.get("/asset/:assetId(\\d+)_:height(\\d+)/transfers", getAssetTransfers);

module.exports = router;
