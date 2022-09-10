const Router = require("koa-router");
const { getBlock } = require("./controllers/block");
const { getBlocks } = require("./controllers/blocks");

const router = new Router();
router.get("/blocks", getBlocks);
router.get("/blocks/:heightOrHash", getBlock);

module.exports = router;
