const Router = require("koa-router");
const { getAssets } = require("./controllers/assets");

const router = new Router();
router.get("/assets", getAssets);

module.exports = router;
