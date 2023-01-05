const { isDefinitionValid, normalizeDefinition } = require("./content");
const { fetchJson } = require("../axios/json");
const { busLogger } = require("@osn/scan-common");
const {
  uniques: { getClassCol, getInstanceCol },
} = require("@statescan/mongo");

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
  if (definitionValid) {
    const definition = normalizeDefinition(metadataJson);
    updates = { ...updates, definition };
  }

  await col.updateOne(q, { $set: updates });
}

async function handleDefinitionCommon(col, isClass = true) {
  const unhandled = await col
    .find({ metadataValid: true, definitionValid: null })
    .toArray();
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
