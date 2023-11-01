const { extractCallsFromExtrinsic } = require("./call");
const { normalizeExtrinsic } = require("./normalize");
const {
  utils: { extractExtrinsicEvents },
} = require("@osn/scan-common");
const { isExemptedExtrinsic } = require("./exemption");

async function normalizeExtrinsics(
  extrinsics = [],
  blockEvents = [],
  blockIndexer,
) {
  let index = 0;
  let normalizedExtrinsics = [];
  let normalizedCalls = [];
  const filteredExtrinsics = extrinsics.filter((e) => !isExemptedExtrinsic(e));
  for (const extrinsic of filteredExtrinsics) {
    const events = extractExtrinsicEvents(blockEvents, index);
    const extrinsicIndexer = { ...blockIndexer, extrinsicIndex: index++ };

    const normalized = normalizeExtrinsic(extrinsic, events, extrinsicIndexer);
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
