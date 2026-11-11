const Router = require("koa-router");
const { getContract } = require("./controllers/contract");
const { getContracts } = require("./controllers/contracts");
const { getContractCalls } = require("./controllers/calls");
const { getVerifiedContracts } = require("./controllers/verifiedContracts");

const router = new Router();
router.get("/contracts", getContracts);
// Keep this route before /contracts/:address, otherwise the address handler
// would take "verified" as an address.
router.get("/contracts/verified", getVerifiedContracts);
router.get("/contracts/:address", getContract);
router.get("/contracts/:address/calls", getContractCalls);

module.exports = router;
