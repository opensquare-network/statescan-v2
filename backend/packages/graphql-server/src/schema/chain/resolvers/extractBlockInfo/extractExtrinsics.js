const {
  normalizeExtrinsic,
} = require("../extractExtrinsicInfo/normalizeExtrinsic");
const {
  utils: { extractExtrinsicEvents },
} = require("@osn/scan-common");

function extractExtrinsics(extrinsics = [], blockEvents = [], blockIndexer) {
  let normalizedExtrinsics = [];

  for (let index = 0; index < extrinsics.length; index++) {
    const extrinsic = extrinsics[index];
    const events = extractExtrinsicEvents(blockEvents, index);
    const extrinsicIndexer = { ...blockIndexer, extrinsicIndex: index };

    const normalized = normalizeExtrinsic(extrinsic, events, extrinsicIndexer);
    normalizedExtrinsics.push(normalized);
  }

  return normalizedExtrinsics;
}

module.exports = {
  extractExtrinsics,
};
