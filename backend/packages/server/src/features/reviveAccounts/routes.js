const Router = require("koa-router");
const { getAccountCalls } = require("./controllers/calls");
const { getAccountContracts } = require("./controllers/contracts");
const { getAccountReviveSummary } = require("./controllers/summary");

const router = new Router();
router.get("/accounts/:address/calls", getAccountCalls);
router.get("/accounts/:address/contracts", getAccountContracts);
router.get("/accounts/:address/revive-summary", getAccountReviveSummary);

module.exports = router;
