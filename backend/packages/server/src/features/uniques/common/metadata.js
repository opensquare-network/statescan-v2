const isNil = require("lodash.isnil");
const pick = require("lodash.pick");
const { populate } = require("../../../utils");
const {
  uniques: { getMetadataCol, getResourceCol },
} = require("@statescan/mongo");

async function populateMetadata(items) {
  await populate({
    items,
    mapItemKeys: ["dataHash"],
    queryFromCol: await getMetadataCol(),
    mapColKeys: ["hash"],
    as: "parsedMetadata",
  });
}

async function populateResource(items) {
  await populate({
    items,
    mapItemKeys: ["imageHash"],
    queryFromCol: await getResourceCol(),
    mapColKeys: ["hash"],
    as: "resource",
  });
}

async function populateParsedMetadata(items) {
  await populateMetadata(items);

  const metadataDefinitions = items
    .map((item) => item.parsedMetadata?.definition)
    .filter((definition) => !isNil(definition));
  await populateResource(metadataDefinitions);
}

function normalizeParsedMetadata(items) {
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

async function getParsedMetadata(dataHash) {
  const metadataCol = await getMetadataCol();
  const metadata = await metadataCol.findOne({ hash: dataHash });
  if (!metadata) {
    return;
  }

  if (!metadata.definition) {
    return;
  }

  const resourceCol = await getResourceCol();
  const resource = await resourceCol.findOne({
    hash: metadata.definition.imageHash,
  });
  if (!resource) {
    return pick(metadata.definition, ["image", "name", "description"]);
  }

  return {
    ...pick(metadata.definition, ["image", "name", "description"]),
    resource: pick(resource, ["metadata", "thumbnail"]),
  };
}

module.exports = {
  populateParsedMetadata,
  normalizeParsedMetadata,
  getParsedMetadata,
};
