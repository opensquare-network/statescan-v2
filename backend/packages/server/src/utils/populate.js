const uniqWith = require("lodash.uniqwith");
const isEqual = require("lodash.isequal");

function getQuery(items, itemKeys, colKeys) {
  const keys = items.map((item) =>
    Object.fromEntries(itemKeys.map((k, i) => [colKeys[i], item[k]])),
  );
  return { $or: uniqWith(keys, isEqual) };
}

function getObjectId(obj, keys) {
  return JSON.stringify(keys.map((k) => obj[k]));
}

function matchAndPopulateItemsByKeys({
  from,
  fromKeys,
  to,
  toKeys,
  as,
  map = (i) => i,
}) {
  const lookup = {};
  for (const item of from) {
    const id = getObjectId(item, fromKeys);
    lookup[id] = item;
  }

  for (const item of to) {
    const id = getObjectId(item, toKeys);
    item[as] = map(lookup[id]);
  }
}

async function populate({ items, mapItemKeys, queryFromCol, mapColKeys, as }) {
  const query = getQuery(items, mapItemKeys, mapColKeys);
  const details = await queryFromCol.find(query).toArray();
  matchAndPopulateItemsByKeys({
    from: details,
    fromKeys: mapColKeys,
    to: items,
    toKeys: mapItemKeys,
    as,
  });
}

async function sumByKeys(queryFromCol, query, groupFields, sumField) {
  const pipeline = [
    { $match: query },
    {
      $group: {
        _id: Object.fromEntries(groupFields.map((f) => [f, "$" + f])),
        result: { $sum: "$" + sumField },
      },
    },
    {
      $project: {
        ...Object.fromEntries(groupFields.map((f) => [f, "$_id." + f])),
        _id: 0,
        result: "$result",
      },
    },
  ];

  return await queryFromCol.aggregate(pipeline).toArray();
}

async function populateSum({
  items,
  mapItemKeys,
  queryFromCol,
  mapColKeys,
  sumField,
  as,
}) {
  const query = getQuery(items, mapItemKeys, mapColKeys);
  const details = await sumByKeys(queryFromCol, query, mapColKeys, sumField);
  matchAndPopulateItemsByKeys({
    from: details,
    fromKeys: mapColKeys,
    to: items,
    toKeys: mapItemKeys,
    map: (item) => item.result,
    as,
  });
}

module.exports = {
  populate,
  populateSum,
};
