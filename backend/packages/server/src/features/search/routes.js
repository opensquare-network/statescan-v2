const Router = require("koa-router");
const { getSearchHints } = require("./controllers/hints");

const router = new Router();

router.get("/search/hints", getSearchHints);

module.exports = router;
