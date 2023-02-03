const Router = require("koa-router");
const { getScanHeights } = require("./controllers/scan");

const router = new Router();
router.get("/status", getScanHeights);

module.exports = router;
