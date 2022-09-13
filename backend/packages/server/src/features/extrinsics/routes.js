const Router = require("koa-router");
const { getExtrinsics } = require("./controllers/extrinsics");

const router = new Router();
router.get("/extrinsics", getExtrinsics);

module.exports = router;
