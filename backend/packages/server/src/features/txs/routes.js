const Router = require("koa-router");
const { getTx } = require("./controllers/tx");

const router = new Router();

router.get("/txs/:hash", getTx);

module.exports = router;
