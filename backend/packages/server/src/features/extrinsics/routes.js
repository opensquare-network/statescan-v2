const Router = require("koa-router");
const { getExtrinsicEvents } = require("./controllers/extrinsicEvents");
const { getExtrinsicCalls } = require("./controllers/calls");
const { getExtrinsic } = require("./controllers/extrinsic");
const { getExtrinsics } = require("./controllers/extrinsics");
const { getExtrinsicTransfers } = require("./controllers/extrinsicTransfers");
const {
  getExtrinsicUniqueTransfers,
} = require("./controllers/extrinsicUniqueTransfers");

const router = new Router();
router.get("/extrinsics", getExtrinsics);
router.get("/extrinsics/:indexOrHash", getExtrinsic);
router.get("/extrinsics/:blockHeight-:extrinsicIndex/calls", getExtrinsicCalls);
router.get(
  "/extrinsics/:blockHeight-:extrinsicIndex/events",
  getExtrinsicEvents,
);
router.get(
  "/extrinsics/:blockHeight-:extrinsicIndex/transfers",
  getExtrinsicTransfers,
);
router.get(
  "/extrinsics/:blockHeight-:extrinsicIndex/unique-transfers",
  getExtrinsicUniqueTransfers,
);

module.exports = router;
