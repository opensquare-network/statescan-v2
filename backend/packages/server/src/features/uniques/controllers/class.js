const { HttpError, extractPage } = require("../../../utils");
const {
  uniques: { getClassCol, getInstanceCol },
} = require("@statescan/mongo");
const {
  getParsedMetadata,
  normalizeParsedMetadata,
  populateParsedMetadata,
} = require("../common/metadata");

async function getClassInstances(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const { classId, classHeight } = ctx.params;

  const q = {
    classId: parseInt(classId),
    classHeight: parseInt(classHeight),
  };
  const instanceCol = await getInstanceCol();
  const items = await instanceCol
    .find(q)
    .sort({ instanceId: 1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();
  const total = await instanceCol.countDocuments(q);

  await populateParsedMetadata(items);

  ctx.body = {
    items: normalizeParsedMetadata(items),
    page,
    pageSize,
    total,
  };
}

async function getClassById(ctx) {
  const { classId } = ctx.params;

  const col = await getClassCol();
  const nftClass = await col.findOne({
    classId: parseInt(classId),
    isDestroyed: { $ne: true },
  });

  if (!nftClass) {
    throw new HttpError(404, "NFT Class not found");
  }

  let parsedMetadata;
  if (nftClass.definitionValid) {
    parsedMetadata = await getParsedMetadata(nftClass.dataHash);
  }

  ctx.body = {
    ...nftClass,
    parsedMetadata,
  };
}

async function getClassByIdAndHeight(ctx) {
  const { classId, classHeight } = ctx.params;

  const col = await getClassCol();
  const nftClass = await col.findOne({
    classId: parseInt(classId),
    classHeight: parseInt(classHeight),
  });

  if (!nftClass) {
    throw new HttpError(404, "NFT Class not found");
  }

  let parsedMetadata;
  if (nftClass.definitionValid) {
    parsedMetadata = await getParsedMetadata(nftClass.dataHash);
  }

  ctx.body = {
    ...nftClass,
    parsedMetadata,
  };
}

module.exports = {
  getClassById,
  getClassByIdAndHeight,
  getClassInstances,
};
