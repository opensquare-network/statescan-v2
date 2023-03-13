const { getRuntimes, getRuntime } = require("./controllers");
const Router = require("koa-router");

const router = new Router();
router.get("/runtimes", getRuntimes);
router.get("/runtimes/:version(\\d+)_:height(\\d+)", getRuntime);

module.exports = router;
