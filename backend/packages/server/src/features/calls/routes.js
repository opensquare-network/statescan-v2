const Router = require("koa-router");
const { getCall } = require("./controllers/call");
const { getCalls } = require("./controllers/calls");

const router = new Router();
router.get("/calls", getCalls);
router.get("/calls/:blockHeight-:extrinsicIndex-:callIndex", getCall);

module.exports = router;
