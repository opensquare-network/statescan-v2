const { extractCallsFromExtrinsic } = require("./call");
const { normalizeExtrinsic } = require("./normalize");
const {
  utils: { extractExtrinsicEvents },
  env: { currentChain },
} = require("@osn/scan-common");
const { isExemptedExtrinsic } = require("./exemption");
const { isSimpleMode } = require("../../env");
const { normalizeInSimpleMode } = require("./simpleNormalize");
const { chainsNoNeedCalls } = require("../common/consts");
const { resolveExtrinsic } = require("./general");

async function normalizeExtrinsics(
  extrinsics = [],
  blockEvents = [],
  blockIndexer,
) {
  let index = 0;
  let normalizedExtrinsics = [];
  let normalizedCalls = [];
  const chain = currentChain();
  for (const extrinsic of extrinsics) {
    const events = extractExtrinsicEvents(blockEvents, index);
    const extrinsicIndexer = { ...blockIndexer, extrinsicIndex: index++ };
    if (isExemptedExtrinsic(extrinsic)) {
      continue;
    }
    // a general transaction authorized by its extensions counts as signed here
    const { isSigned } = resolveExtrinsic(extrinsic);
    if (
      !isSigned &&
      ![
        "tangle",
        "tangle-testnet",
        "gargantua",
        "nexus",
        "cere",
        "argon",
        "bulletin-polkadot",
        "bulletin-paseo",
      ].includes(chain)
    ) {
      continue;
    }

    let normalized;
    if (isSimpleMode()) {
      normalized = normalizeInSimpleMode(extrinsic, events, extrinsicIndexer);
    } else {
      normalized = normalizeExtrinsic(extrinsic, events, extrinsicIndexer);
    }

    let calls = [];
    if (!chainsNoNeedCalls.includes(chain)) {
      calls = await extractCallsFromExtrinsic(
        extrinsic,
        events,
        extrinsicIndexer,
      );
    }
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
