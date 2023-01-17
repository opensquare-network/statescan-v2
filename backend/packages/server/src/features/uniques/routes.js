const Router = require("koa-router");
const { getClasses } = require("./controllers/classes");
const { getClassById, getClassByIdAndHeight } = require("./controllers/class");
const { getClassInstances } = require("./controllers/classInstances");
const { getClassTimeline } = require("./controllers/classTimeline");
const { getClassAttributes } = require("./controllers/classAttributes");
const {
  getInstanceById,
  getInstanceByIdAndHeight,
} = require("./controllers/instance");
const { getInstanceAttributes } = require("./controllers/instanceAttributes");
const { getInstanceTimeline } = require("./controllers/instanceTimeline");
const { getInstanceTransfers } = require("./controllers/instanceTransfers");

const router = new Router();

router.get("/uniques/classes", getClasses);
router.get(
  "/uniques/classes/:classId(\\d+)_:classHeight(\\d+)",
  getClassByIdAndHeight,
);
router.get("/uniques/classes/:classId(\\d+)", getClassById);
router.get(
  "/uniques/classes/:classId(\\d+)_:classHeight(\\d+)/instances",
  getClassInstances,
);
router.get(
  "/uniques/classes/:classId(\\d+)_:classHeight(\\d+)/timeline",
  getClassTimeline,
);
router.get(
  "/uniques/classes/:classId(\\d+)_:classHeight(\\d+)/attributes",
  getClassAttributes,
);

router.get(
  "/uniques/classes/:classId(\\d+)/instances/:instanceId(\\d+)",
  getInstanceById,
);
router.get(
  "/uniques/classes/:classId(\\d+)_:classHeight(\\d+)/instances/:instanceId(\\d+)_:instanceHeight(\\d+)",
  getInstanceByIdAndHeight,
);
router.get(
  "/uniques/classes/:classId(\\d+)_:classHeight(\\d+)/instances/:instanceId(\\d+)_:instanceHeight(\\d+)/timeline",
  getInstanceTimeline,
);
router.get(
  "/uniques/classes/:classId(\\d+)_:classHeight(\\d+)/instances/:instanceId(\\d+)_:instanceHeight(\\d+)/attributes",
  getInstanceAttributes,
);
router.get(
  "/uniques/classes/:classId(\\d+)_:classHeight(\\d+)/instances/:instanceId(\\d+)_:instanceHeight(\\d+)/transfers",
  getInstanceTransfers,
);

module.exports = router;
