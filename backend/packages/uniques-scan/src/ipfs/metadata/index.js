const { populateMetadata } = require("./populate");
const { parseDefinition } = require("./definition");

async function handleMetadata() {
  await populateMetadata();
  await parseDefinition();
}

module.exports = {
  handleMetadata,
};
