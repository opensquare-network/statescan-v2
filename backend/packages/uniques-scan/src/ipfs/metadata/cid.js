const { isMetadataConfigIpfs, getMetadataCid } = require("./onchain");
const {
  uniques: { getClassCol, getInstanceCol },
} = require("@statescan/mongo");
const { busLogger } = require("@osn/scan-common");
const isNil = require("lodash.isnil");
const { getItemQ } = require("./utils");

async function handleMetadataCommon(col, isClass = true) {
  const unhandled = await col
    .find({ metadata: { $exists: true }, metadataValid: null })
    .toArray();
  busLogger.info(
    `${unhandled.length} metadata cid to handle for ${
      isClass ? "class" : "instance"
    }`,
  );

  for (const item of unhandled) {
    const q = getItemQ(item, isClass);
    const metadataValid = await isMetadataConfigIpfs(item.metadata);
    let updates = { metadataValid };
    let metadataCid;
    if (metadataValid) {
      metadataCid = getMetadataCid(item.metadata);
      updates = { ...updates, metadataCid };
    }
    await col.updateOne(q, { $set: updates });

    const type = isNil(instanceId) ? "class" : "instance";
    const id = isNil(instanceId) ? `${classId}` : `${classId}/${instanceId}`;
    busLogger.info(
      `${type}: ${id} handled. Valid: ${metadataValid}, CID: ${metadataCid}`,
    );
  }
}

async function handleMetadataCID() {
  await Promise.all([
    // parse and save metadata IPFS CID
    handleMetadataCommon(await getClassCol(), true),
    handleMetadataCommon(await getInstanceCol(), false),
  ]);
}

module.exports = {
  handleMetadataCID,
};
