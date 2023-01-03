const {
  uniques: { getClassCol },
} = require("@statescan/mongo");

async function getClassIdHeightMap(classIds = []) {
  if (classIds.length <= 0) {
    throw new Error(`class ids length <= 0`);
  }

  const classCol = await getClassCol();
  const classes = await classCol
    .find({
      classId: { $in: classIds },
      isDestroyed: false,
    })
    .toArray();

  return classes.reduce((result, cls) => {
    result[cls.classId] = cls.classHeight;
    return result;
  }, {});
}

module.exports = {
  getClassIdHeightMap,
};
