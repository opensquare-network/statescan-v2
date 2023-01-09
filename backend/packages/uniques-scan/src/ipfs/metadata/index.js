const { populateMetadata } = require("./populate");
const { parseDefinition } = require("./definition");
const { parseResource } = require("./resource");

async function handleMetadata() {
  await populateMetadata();
  await parseDefinition();
  await parseResource();
}

module.exports = {
  handleMetadata,
};
