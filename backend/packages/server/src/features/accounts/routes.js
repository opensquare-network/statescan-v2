const Router = require("koa-router");
const { getAccountTransfers } = require("./controllers/transfers");
const { getAccountExtrinsics } = require("./controllers/extrinsics");
const { getAccount } = require("./controllers/account");
const { getAccounts } = require("./controllers/accounts");
const { getAccountAssets } = require("./controllers/assets");

const router = new Router();
router.get("/accounts", getAccounts);
router.get("/accounts/:address", getAccount);

router.get("/accounts/:address/transfers", getAccountTransfers);
router.get("/accounts/:address/extrinsics", getAccountExtrinsics);
router.get("/accounts/:address/assets", getAccountAssets);

module.exports = router;
