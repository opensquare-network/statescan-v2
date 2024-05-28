const {
  block: { getCallCollection },
} = require("@statescan/mongo");
const { getTimeDimension } = require("../../../common/getTimeDimension");
const { extractPage } = require("../../../utils");

async function getCalls(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const { section, method } = ctx.query;
  const q = {
    ...getTimeDimension(ctx),
  };
  if (section) {
    q.section = section;
  }
  if (method) {
    q.method = method;
  }

  const col = await getCallCollection();
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort({
      "indexer.blockHeight": -1,
      "indexer.extrinsicIndex": 1,
      "indexer.callIndex": 1,
    })
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
  getCalls,
};
