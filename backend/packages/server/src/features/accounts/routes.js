const Router = require("koa-router");
const { getAccount } = require("./controllers/account");
const { getAccounts } = require("./controllers/accounts");

const router = new Router();
router.get("/accounts", getAccounts);
router.get("/accounts/:address", getAccount);

module.exports = router;
