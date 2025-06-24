const {
  known: { saveKnownHeight },
} = require("@statescan/common");

async function doJobsAfterBlock(blockIndexer) {
  await saveKnownHeight(blockIndexer);
}

module.exports = {
  doJobsAfterBlock,
};
