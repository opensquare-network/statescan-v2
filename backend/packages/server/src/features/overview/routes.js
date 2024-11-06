const Router = require("koa-router");
const { getOverview } = require("../../jobs/overview");

const router = new Router();

router.get("/overview", async (ctx) => (ctx.body = getOverview()));

module.exports = router;
