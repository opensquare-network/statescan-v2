const isNil = require("lodash.isnil");
const { extractPage, isTrue, populate } = require("../../../utils");
const {
  uniques: { getClassCol, getMetadataCol, getResourceCol },
} = require("@statescan/mongo");

async function populateParsedMetadata(items) {
  await populate({
    items,
    mapItemKeys: ["dataHash"],
    queryFromCol: await getMetadataCol(),
    mapColKeys: ["hash"],
    as: "parsedMetadata",
  });
}

async function populateDefinitionResource(items) {
  await populate({
    items,
    mapItemKeys: ["imageHash"],
    queryFromCol: await getResourceCol(),
    mapColKeys: ["hash"],
    as: "resource",
  });
}

function normalizeClasses(items) {
  return items.map((item) => {
    let parsedMetadata;

    const definition = item.parsedMetadata?.definition;
    if (definition) {
      parsedMetadata = {
        name: definition.name,
        image: definition.image,
        description: definition.description,
      };

      const resource = definition.resource;
      if (resource) {
        parsedMetadata = {
          ...parsedMetadata,
          resource: {
            metadata: resource.metadata,
            thumbnail: resource.thumbnail,
            type: resource.type,
          },
        };
      }
    }

    return {
      ...item,
      parsedMetadata,
    };
  });
}

async function getClasses(ctx) {
  const { page, pageSize } = extractPage(ctx);
  if (pageSize === 0 || page < 0) {
    ctx.status = 400;
    return;
  }

  const { destroyed } = ctx.query;

  const q = { isDestroyed: isTrue(destroyed) };

  const col = await getClassCol();
  const items = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ classId: 1 })
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray();

  const total = await col.countDocuments(q);

  await populateParsedMetadata(items);

  const metadataDefinitions = items
    .map((item) => item.parsedMetadata?.definition)
    .filter((definition) => !isNil(definition));
  await populateDefinitionResource(metadataDefinitions);

  ctx.body = {
    items: normalizeClasses(items),
    page,
    pageSize,
    total,
  };
}

module.exports = {
  getClasses,
};
