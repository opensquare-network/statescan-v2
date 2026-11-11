const Router = require("koa-router");
const { getContract } = require("./controllers/contract");
const { getContracts } = require("./controllers/contracts");
const { getContractCalls } = require("./controllers/calls");

const router = new Router();
router.get("/contracts", getContracts);
router.get("/contracts/:address", getContract);
router.get("/contracts/:address/calls", getContractCalls);

module.exports = router;
