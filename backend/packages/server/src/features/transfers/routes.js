const Router = require("koa-router");
const { getTransfers } = require("./controllers/transfers");

const router = new Router();
router.get("/transfers", getTransfers);

module.exports = router;
