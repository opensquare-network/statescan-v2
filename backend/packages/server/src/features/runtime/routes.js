const { getRuntimes } = require("./controllers");
const Router = require("koa-router");

const router = new Router();
router.get("/runtimes", getRuntimes);

module.exports = router;
