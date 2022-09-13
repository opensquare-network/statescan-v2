const Router = require("koa-router");
const { getExtrinsic } = require("./controllers/extrinsic");
const { getExtrinsics } = require("./controllers/extrinsics");

const router = new Router();
router.get("/extrinsics", getExtrinsics);
router.get("/extrinsics/:indexOrHash", getExtrinsic);

module.exports = router;
