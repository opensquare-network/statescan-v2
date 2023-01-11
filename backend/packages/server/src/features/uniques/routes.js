const Router = require("koa-router");
const { getClasses } = require("./controllers/classes");

const router = new Router();

router.get("/uniques/classes", getClasses);

module.exports = router;
