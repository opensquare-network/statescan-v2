const { isMetadataConfigIpfs, getMetadataCid } = require("./onchain");
const {
  uniques: { getClassCol, getInstanceCol },
} = require("@statescan/mongo");

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
    if (metadataValid) {
      const metadataCid = getMetadataCid(metadata);
      updates = { ...updates, metadataCid };
    }
    await col.updateOne(q, { $set: updates });
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
