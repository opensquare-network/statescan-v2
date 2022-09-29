const { batchUpsertTransfers } = require("./db");
const {
  chain: { getBlockIndexer },
  consts: { BalancesEvents, Modules },
} = require("@osn/scan-common");
const {
  utils: { toDecimal128 },
} = require("@statescan/common");

function normalizeEvent(
  rawEvent,
  eventIndex,
  extrinsics = [],
  blockIndexer = {},
) {
  let indexer = {
    ...blockIndexer,
    eventIndex,
  };

  const { event, phase } = rawEvent;
  let extrinsic;
  if (!phase.isNone) {
    const extrinsicIndex = phase.value.toNumber();
    indexer = {
      ...indexer,
      extrinsicIndex,
    };
    extrinsic = extrinsics[extrinsicIndex];
  }

  return {
    event,
    indexer,
    extrinsic,
  };
}

function extractTransfer({ event, indexer, extrinsic }) {
  const { section, method } = event;
  if (Modules.Balances !== section || BalancesEvents.Transfer !== method) {
    return null;
  }

  const [from, to, value] = event.data.toJSON();

  let isSigned = false;
  if (extrinsic) {
    isSigned = extrinsic.isSigned;
  }

  return {
    indexer,
    from,
    to,
    balance: toDecimal128(value),
    isSigned,
  };
}

async function handleUnFinalizedBlock({ block, events }) {
  // extract transfers
  const blockIndexer = getBlockIndexer(block);

  const normalizedEvents = events.map((event, index) =>
    normalizeEvent(event, index, block.extrinsics, blockIndexer),
  );

  const transfers = normalizedEvents.reduce((result, item) => {
    const transfer = extractTransfer(item);
    if (transfer) {
      return [...result, transfer];
    }

    return result;
  }, []);

  await batchUpsertTransfers(transfers);
}

module.exports = {
  handleUnFinalizedBlock,
};
