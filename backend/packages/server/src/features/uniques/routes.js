const Router = require("koa-router");
const { getClasses } = require("./controllers/classes");
const {
  getClassById,
  getClassByIdAndHeight,
  getClassInstances,
} = require("./controllers/class");

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

module.exports = router;
