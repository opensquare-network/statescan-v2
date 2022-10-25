const Router = require("koa-router");
const { getSpecFilter } = require("./controllers/filter");

const router = new Router();
router.get("/specs/filter", getSpecFilter);

module.exports = router;
