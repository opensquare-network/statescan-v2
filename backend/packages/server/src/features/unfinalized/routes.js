const Router = require("koa-router");
const { getUnFinalizedExtrinsics } = require("./controllers/extrinsics");
const { getUnFinalizedBlocks } = require("./controllers/blocks");

const router = new Router();
router.get("/unfinalized/blocks", getUnFinalizedBlocks);
router.get("/unfinalized/extrinsics", getUnFinalizedExtrinsics);

module.exports = router;
