const { syncParsedData } = require("../../ipfs/metadata/sync");
const { parseResource } = require("../../ipfs/metadata/resource");
const { oneMinute } = require("./common");
const { parseDefinition } = require("../../ipfs/metadata/definition");
const { populateMetadata } = require("../../ipfs/metadata/populate");

async function populateAndParseMetadata() {
  try {
    await populateMetadata();
    await parseDefinition();
  } finally {
    setTimeout(populateAndParseMetadata, oneMinute * 3);
  }
}

async function parseNftResource() {
  try {
    await parseResource();
  } finally {
    setTimeout(parseNftResource, oneMinute * 10);
  }
}

async function syncParseResult() {
  try {
    await syncParsedData();
  } finally {
    setTimeout(syncParseResult, oneMinute);
  }
}

module.exports = {
  populateAndParseMetadata,
  parseNftResource,
  syncParseResult,
};
