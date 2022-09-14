const { normalizeData } = require("./common");
const { extractPage } = require("../../../utils");
const {
  account: { getAddressCollection },
} = require("@statescan/mongo");

async function getAccounts(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const col = await getAddressCollection();
  const items = await col
    .find({}, { projection: { _id: 0 } })
    .sort({ "data.total": -1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();
  const normalizedItems = items.map((item) => {
    return {
      ...item,
      data: normalizeData(item.data),
    };
  });
  const total = await col.estimatedDocumentCount();

  ctx.body = {
    items: normalizedItems,
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getAccounts,
};
