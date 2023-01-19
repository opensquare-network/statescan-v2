const pick = require("lodash.pick");
const {
  uniques: { getClassCol },
} = require("@statescan/mongo");
const {
  utils: { isValidAddress },
} = require("@statescan/common");
const { isHash, isNum, escapeRegex } = require("../../../../utils");

function normalizeQueryResult(items) {
  return items.map((item) => ({
    ...pick(item, ["classId", "classHeight", "parsedMetadata"]),
  }));
}

async function handleClassId(term) {
  const classId = parseInt(term);
  if (isNaN(classId)) {
    return null;
  }

  const col = await getClassCol();
  return await col.find({ classId, isDestroyed: false }).toArray();
}

async function handleClassName(term) {
  if (term.length < 2) {
    return null;
  }

  if (isHash(term)) {
    return null;
  }

  if (isValidAddress(term)) {
    return null;
  }

  const regex = new RegExp(`${escapeRegex(term)}`, "i");

  const col = await getClassCol();
  return await col
    .find({
      isDestroyed: false,
      "parsedMetadata.name": regex,
    })
    .sort({ "parsedMetadata.name": 1 })
    .limit(5)
    .toArray();
}

async function queryNftClasses(term) {
  let result = null;

  if (isNum(term)) {
    result = await handleClassId(term);
  } else {
    result = await handleClassName(term);
  }

  if (result?.length > 0) {
    return normalizeQueryResult(result);
  }

  return null;
}

module.exports = {
  queryNftClasses,
};
