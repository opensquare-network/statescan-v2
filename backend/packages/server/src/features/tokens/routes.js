const Router = require("koa-router");
const { getTokens } = require("./controllers/tokens");

const router = new Router();
router.get("/tokens", getTokens);

module.exports = router;
