const { populateMetadata } = require("./populate");
const { parseDefinition } = require("./definition");
const { parseResource } = require("./resource");
const { syncParsedData } = require("./sync");

async function handleMetadata() {
  await populateMetadata();
  await parseDefinition();
  await parseResource();
  await syncParsedData();
}

module.exports = {
  handleMetadata,
};
