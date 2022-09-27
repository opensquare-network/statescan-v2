const Router = require("koa-router");
const { getBlockExtrinsics } = require("./controllers/blockExtrinsics");
const { getBlock } = require("./controllers/block");
const { getBlocks } = require("./controllers/blocks");

const router = new Router();
router.get("/blocks", getBlocks);
router.get("/blocks/:heightOrHash", getBlock);
router.get("/blocks/:heightOrHash/extrinsics", getBlockExtrinsics);

module.exports = router;
