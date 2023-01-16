const Router = require("koa-router");
const { getClasses } = require("./controllers/classes");
const { getClassById, getClassByIdAndHeight } = require("./controllers/class");
const { getClassInstances } = require("./controllers/classInstances");
const { getClassTimeline } = require("./controllers/classTimeline");

const router = new Router();

router.get("/uniques/classes", getClasses);
router.get(
  "/uniques/class/:classId(\\d+)_:classHeight(\\d+)",
  getClassByIdAndHeight,
);
router.get("/uniques/class/:classId(\\d+)", getClassById);
router.get(
  "/uniques/class/:classId(\\d+)_:classHeight(\\d+)/instances",
  getClassInstances,
);
router.get(
  "/uniques/class/:classId(\\d+)_:classHeight(\\d+)/timeline",
  getClassTimeline,
);

module.exports = router;
