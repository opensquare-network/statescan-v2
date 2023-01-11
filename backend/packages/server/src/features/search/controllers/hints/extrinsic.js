const { isHash } = require("../../../../utils");
const {
  block: { getExtrinsicCollection },
} = require("@statescan/mongo");

async function queryExtrinsic(term = "") {
  if (!isHash(term)) {
    return null;
  }

  const col = await getExtrinsicCollection();
  let arr = await col.find({ hash: term }).limit(1).toArray();
  if (arr.length > 0) {
    return term;
  }

  return null;
}

module.exports = {
  queryExtrinsic,
};
