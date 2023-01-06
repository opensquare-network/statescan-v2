const { handleMetadataDefinition } = require("./definition");
const { handleMetadataCID } = require("./cid");
const { handleMetadataResource } = require("./resource");

async function handleMetadata() {
  await handleMetadataCID();
  await handleMetadataDefinition();
  await handleMetadataResource();
}

module.exports = {
  handleMetadata,
};
