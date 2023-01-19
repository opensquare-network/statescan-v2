const pick = require("lodash.pick");
const {
  uniques: { getInstanceCol },
} = require("@statescan/mongo");
const {
  utils: { isValidAddress },
} = require("@statescan/common");
const { isHash, escapeRegex } = require("../../../../utils");

function normalizeQueryResult(items) {
  return items.map((item) => ({
    ...pick(item, [
      "classId",
      "classHeight",
      "instanceId",
      "instanceHeight",
      "parsedMetadata",
    ]),
  }));
}

async function queryNftInstances(term) {
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

  const col = await getInstanceCol();
  const items = await col
    .find({
      isDestroyed: false,
      isClassDestroyed: false,
      "parsedMetadata.name": regex,
    })
    .sort({ "parsedMetadata.name": 1 })
    .limit(5)
    .toArray();

  if (items?.length > 0) {
    return normalizeQueryResult(items);
  }

  return null;
}

module.exports = {
  queryNftInstances,
};
