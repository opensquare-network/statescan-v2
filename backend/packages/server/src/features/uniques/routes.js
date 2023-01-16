const Router = require("koa-router");
const { getClasses } = require("./controllers/classes");
const { getClassById, getClassByIdAndHeight } = require("./controllers/class");

const router = new Router();

router.get("/uniques/classes", getClasses);
router.get(
  "/uniques/class/:classId(\\d+)_:classHeight(\\d+)",
  getClassByIdAndHeight,
);
router.get("/uniques/class/:classId(\\d+)", getClassById);

module.exports = router;
