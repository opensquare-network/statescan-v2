const { handleMetadataCID } = require("./cid");
const { handleMetadataResource } = require("./resource");

async function handleMetadata() {
  await handleMetadataCID();
  await handleMetadataResource();
}

module.exports = {
  handleMetadata,
};
