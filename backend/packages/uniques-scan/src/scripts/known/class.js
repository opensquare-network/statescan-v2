const { saveCommon } = require("./common");
const {
  uniques: { getClassCol, getClassTimelineCol, getClassAttributeCol },
} = require("@statescan/mongo");

async function _saveClassHeights() {
  const col = await getClassCol();
  await saveCommon(col);
}

async function _saveTimelineHeights() {
  const col = await getClassTimelineCol();
  await saveCommon(col);
}

async function saveClassKnownHeights() {
  await _saveClassHeights();
  await _saveTimelineHeights();
  await saveCommon(await getClassAttributeCol());
}

module.exports = {
  saveClassKnownHeights,
};
