const Router = require("koa-router");
const { getBlocks } = require("./controllers/blocks");

const router = new Router();
router.get("/blocks", getBlocks);

module.exports = router;
