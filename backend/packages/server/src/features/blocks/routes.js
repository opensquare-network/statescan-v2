const Router = require("koa-router");
const { getBlockEvents } = require("./controllers/blockEvents");
const { getBlockExtrinsics } = require("./controllers/blockExtrinsics");
const { getBlock } = require("./controllers/block");
const { getBlocks } = require("./controllers/blocks");
const { getLatestOverviewBlocks } = require("./controllers/latestBlocks");

const router = new Router();
router.get("/blocks", getBlocks);
router.get("/latest-blocks", getLatestOverviewBlocks);
router.get("/blocks/:heightOrHash", getBlock);
router.get("/blocks/:heightOrHash/extrinsics", getBlockExtrinsics);
router.get("/blocks/:heightOrHash/events", getBlockEvents);

module.exports = router;
