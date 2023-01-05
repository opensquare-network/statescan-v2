const { handleMetadataDefinition } = require("./definition");
const { handleMetadataCID } = require("./cid");

async function handleMetadata() {
  await handleMetadataCID();
  await handleMetadataDefinition();
}

module.exports = {
  handleMetadata,
};
