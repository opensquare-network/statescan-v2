const { isMetadataConfigIpfs, getMetadataCid } = require("./onchain");
const {
  uniques: { getClassCol, getInstanceCol },
} = require("@statescan/mongo");
const { busLogger } = require("@osn/scan-common");
const isNil = require("lodash.isnil");

async function handleMetadataCommon(col, isClass = true) {
  const unhandled = await col
    .find({ metadata: { $exists: true }, metadataValid: null })
    .toArray();
  for (const {
    metadata,
    classId,
    classHeight,
    instanceId,
    instanceHeight,
  } of unhandled) {
    let q = { classId, classHeight };
    if (!isClass) {
      q = {
        ...q,
        instanceId,
        instanceHeight,
      };
    }

    const metadataValid = await isMetadataConfigIpfs(metadata);
    let updates = { metadataValid };
    let metadataCid;
    if (metadataValid) {
      metadataCid = getMetadataCid(metadata);
      updates = { ...updates, metadataCid };
    }
    await col.updateOne(q, { $set: updates });

    const type = isNil(instanceId) ? "class" : "instance";
    const id = isNil(instanceId) ? `${classId}/${instanceId}` : `${classId}`;
    busLogger.info(
      `${type}: ${id} handled. Valid: ${metadataValid}, CID: ${metadataCid}`,
    );
  }
}

async function handleMetadataCID() {
  // parse and save metadata IPFS CID
  await handleMetadataCommon(await getClassCol(), true);
  await handleMetadataCommon(await getInstanceCol(), false);
}

module.exports = {
  handleMetadataCID,
};
