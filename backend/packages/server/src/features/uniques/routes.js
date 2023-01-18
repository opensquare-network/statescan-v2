const Router = require("koa-router");
const { getClasses } = require("./controllers/classes");
const { getClassById, getClassByIdAndHeight } = require("./controllers/class");
const { getClassInstances } = require("./controllers/classInstances");
const { getClassTimeline } = require("./controllers/classTimeline");
const { getClassAttributes } = require("./controllers/classAttributes");
const { getPopularClasses } = require("./controllers/popular");

const router = new Router();

router.get("/uniques/classes", getClasses);
router.get("/uniques/classes/popular", getPopularClasses);
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

module.exports = router;
