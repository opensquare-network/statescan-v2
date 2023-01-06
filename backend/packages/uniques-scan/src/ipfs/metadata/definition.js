const { isDefinitionValid, normalizeDefinition } = require("./content");
const { fetchJson } = require("../axios/json");
const { busLogger } = require("@osn/scan-common");
const {
  uniques: { getClassCol, getInstanceCol },
} = require("@statescan/mongo");
const isNil = require("lodash.isnil");

async function handleOneItem(col, item, isClass = true) {
  const { metadataCid, classId, classHeight, instanceId, instanceHeight } =
    item;
  let metadataJson;
  try {
    metadataJson = await fetchJson(metadataCid);
  } catch (e) {
    busLogger.error(`Error fetch metadata json of CID: ${metadataCid}`);
    return;
  }

  const definitionValid = await isDefinitionValid(metadataJson);
  let q = { classId, classHeight };
  if (!isClass) {
    q = { ...q, instanceId, instanceHeight };
  }

  let updates = { definitionValid };
  let definition;
  if (definitionValid) {
    definition = await normalizeDefinition(metadataJson);
    updates = { ...updates, definition };
  }

  await col.updateOne(q, { $set: updates });

  const type = isNil(instanceId) ? "class" : "instance";
  const id = isNil(instanceId) ? `${classId}` : `${classId}/${instanceId}`;
  busLogger.info(
    `${type}: ${id} handled. Valid: ${definitionValid}, definition: ${JSON.stringify(
      definition,
    )}`,
  );
}

async function handleDefinitionCommon(col, isClass = true) {
  const unhandled = await col
    .find({ metadataValid: true, definitionValid: null })
    .toArray();
  busLogger.info(
    `${unhandled.length} metadata definition to handle for ${
      isClass ? "class" : "instance"
    }`,
  );

  const promises = [];
  for (const item of unhandled) {
    const promise = handleOneItem(col, item, isClass);
    promises.push(promise);
  }

  return await Promise.all(promises);
}

async function handleMetadataDefinition() {
  // fetch, parse and save metadata definition from IPFS
  await handleDefinitionCommon(await getClassCol(), true);
  await handleDefinitionCommon(await getInstanceCol(), false);
}

module.exports = {
  handleMetadataDefinition,
};
