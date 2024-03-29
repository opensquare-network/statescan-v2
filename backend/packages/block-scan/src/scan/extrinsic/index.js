const { extractCallsFromExtrinsic } = require("./call");
const { normalizeExtrinsic } = require("./normalize");
const {
  utils: { extractExtrinsicEvents },
} = require("@osn/scan-common");
const { isExemptedExtrinsic } = require("./exemption");
const { isSimpleMode } = require("../../env");
const { normalizeInSimpleMode } = require("./simpleNormalize");

async function normalizeExtrinsics(
  extrinsics = [],
  blockEvents = [],
  blockIndexer,
) {
  let index = 0;
  let normalizedExtrinsics = [];
  let normalizedCalls = [];
  for (const extrinsic of extrinsics) {
    const events = extractExtrinsicEvents(blockEvents, index);
    const extrinsicIndexer = { ...blockIndexer, extrinsicIndex: index++ };
    if (
      isSimpleMode() &&
      (isExemptedExtrinsic(extrinsic) || !extrinsic.isSigned)
    ) {
      continue;
    }

    let normalized;
    if (isSimpleMode()) {
      normalized = normalizeInSimpleMode(extrinsic, events, extrinsicIndexer);
    } else {
      normalized = normalizeExtrinsic(extrinsic, events, extrinsicIndexer);
    }

    const calls = await extractCallsFromExtrinsic(
      extrinsic,
      events,
      extrinsicIndexer,
    );
    normalizedCalls.push(...calls);
    normalizedExtrinsics.push({
      ...normalized,
      callsCount: calls.length,
    });
  }

  return {
    normalizedExtrinsics,
    normalizedCalls,
  };
}

module.exports = {
  normalizeExtrinsics,
};
