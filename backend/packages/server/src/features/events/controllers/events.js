const { extractPage } = require("../../../utils");
const {
  block: { getEventCollection },
} = require("@statescan/mongo");

async function getEvents(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const {
    section,
    method,
    is_extrinsic: isExtrinsic,
    no_extrinsic_result: noExtrinsicResult,
  } = ctx.query;
  const q = {};
  if (section) {
    q.section = section;
  }
  if (method) {
    q.method = method;
  }
  if (isExtrinsic === "true") {
    q.isExtrinsic = true;
  }
  if (noExtrinsicResult === "true") {
    q.isExtrinsicResult = false;
  }

  const col = await getEventCollection();
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ "indexer.blockHeight": -1, "indexer.eventIndex": 1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();

  ctx.body = {
    items,
    page,
    pageSize,
  };
}

module.exports = {
  getEvents,
};
