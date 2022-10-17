const { normalizeExtrinsic } = require("./normalize");
const {
  utils: { extractExtrinsicEvents },
} = require("@osn/scan-common");

function normalizeExtrinsics(extrinsics = [], blockEvents = [], blockIndexer) {
  let index = 0;
  let normalizedExtrinsics = [];
  for (const extrinsic of extrinsics) {
    const events = extractExtrinsicEvents(blockEvents, index);
    const extrinsicIndexer = { ...blockIndexer, extrinsicIndex: index++ };

    const normalized = normalizeExtrinsic(extrinsic, events, extrinsicIndexer);
    normalizedExtrinsics.push(normalized);
  }

  return normalizedExtrinsics;
}

module.exports = {
  normalizeExtrinsics,
};
