const { extractPage } = require("../../../utils");
const {
  uniques: { getClassCol, getInstanceCol, getInstanceTransferCol },
} = require("@statescan/mongo");
const { getAddressQuery } = require("../../../common/getAddressQuery");

async function populateNftClass(items) {
  const classCol = await getClassCol();
  for (const item of items) {
    const nftClass = await classCol.findOne({
      classId: item.classId,
      classHeight: item.classHeight,
    });
    item.class = nftClass;
  }
}

async function populateNftInstance(items) {
  const instanceCol = await getInstanceCol();
  for (const item of items) {
    const nftInstance = await instanceCol.findOne({
      classId: item.classId,
      classHeight: item.classHeight,
      instanceId: item.instanceId,
      instanceHeight: item.instanceHeight,
    });
    item.instance = nftInstance;
  }
}

async function getAccountNftTransfers(ctx) {
  const { address } = ctx.params;
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const q = {
    $or: [getAddressQuery("from", address), getAddressQuery("to", address)],
  };
  const transferCol = await getInstanceTransferCol();
  const items = await transferCol
    .find(q)
    .sort({ "indexer.blockHeight": -1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();

  const total = await transferCol.countDocuments(q);

  await populateNftClass(items);
  await populateNftInstance(items);

  ctx.body = {
    items,
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getAccountNftTransfers,
};
