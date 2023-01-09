const {
  uniques: { getClassCol },
} = require("@statescan/mongo");

async function getClass(classId) {
  const classCol = await getClassCol();
  return await classCol.findOne({ classId, isDestroyed: false });
}

module.exports = {
  getClass,
};
