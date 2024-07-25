const {
  palletProxy: { getAnnouncementCol },
} = require("@statescan/mongo");
const isNil = require("lodash.isnil");
const isEmpty = require("lodash.isempty");
const { normalizeAnnouncement } = require("./common");

async function announcements(_, _args) {
  const { delegator, delegatee, isFinal, offset, limit } = _args;
  if (parseInt(limit) > 100) {
    throw new Error("Over max page size 100");
  }

  let q = {};
  if (delegator) {
    Object.assign(q, { real: delegator });
  }
  if (delegatee) {
    Object.assign(q, { delegate: delegatee });
  }
  if (!isNil(isFinal)) {
    Object.assign(q, { isFinal });
  }

  const col = await getAnnouncementCol();
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": -1 })
    .skip(offset)
    .limit(limit)
    .toArray();
  let total;
  if (isEmpty(q)) {
    total = await col.estimatedDocumentCount();
  } else {
    total = await col.countDocuments(q);
  }

  return {
    items: items.map(normalizeAnnouncement),
    offset,
    limit,
    total,
  };
}

module.exports = {
  proxyAnnouncements: announcements,
};
