const Router = require("koa-router");
const { getTransfers } = require("./controllers/transfers");
const { getLatestTransfers } = require("./controllers/latestTransfers");

const router = new Router();
router.get("/transfers", getTransfers);
router.get("/latest-transfers", getLatestTransfers);

module.exports = router;
