const Router = require("koa-router");
const { getAssets } = require("./controllers/assets");
const { getAsset } = require("./controllers/asset");

const router = new Router();
router.get("/assets", getAssets);
router.get("/asset/:assetId(\\d+)_:createdHeight(\\d+)", getAsset);

module.exports = router;
