const { queryMultisig } = require("../../query/multisig");
const {
  multisig: { insertMultisig, insertMultisigTimelineItem, upsertMultiAccount },
} = require("@statescan/mongo");
const {
  consts: { MultisigStateType },
} = require("@statescan/common");
const { generateMultisigId } = require("../../common/multisig");
const { extractCall } = require("./common/extractCall");
const { extractSignatories } = require("./common/extractThreshold");
const {
  consts: { TimelineItemTypes },
  busLogger: logger,
} = require("@osn/scan-common");
const {
  getCallHashFromExtrinsic,
} = require("./common/getCallHashFromExtrinsic");
const isNil = require("lodash.isnil");

function constructMetaWhenNoStorage(event, indexer, blockEvents) {
  const eventIndex = indexer.eventIndex;
  // todo: 1. find the closest balances#Reserved event
  const candidateEvents = blockEvents.slice(0, eventIndex).reverse();
  const reservationEvent = candidateEvents.find(
    ({ event }) => "balances" === event.section && "Reserved" === event.method,
  );
  if (!reservationEvent) {
    throw new Error(
      `Multisig Reserved event at ${indexer.blockHeight} not found.`,
    );
  }

  const data = reservationEvent.event.data;
  const depositor = data[0].toString();
  return {
    when: {
      height: indexer.blockHeight,
      index: indexer.extrinsicIndex,
    },
    deposit: data[1].toJSON(),
    depositor,
    approvals: [depositor],
  };
}

async function safeInsertMultisig(obj) {
  try {
    await insertMultisig(obj);
  } catch (e) {
    if (e.code === 15 && e.codeName === "Overflow") {
      // check bsonobj exceeds maximum nested object depth
      const newObj = { ...obj };
      delete newObj.call;
      await insertMultisig(newObj);
    }
  }
}

async function handleNewMultisig(event, indexer, extrinsic, blockEvents = []) {
  const who = event.data[0].toString();
  const multisigAddress = event.data[1].toString();
  let callHash;
  if (event.data.length < 3) {
    // For kusama spec 1055, `NewMultisig` event has no callHash argument
    callHash = await getCallHashFromExtrinsic(extrinsic, indexer); // it's a workaround, not perfect.
  } else {
    callHash = event.data[2].toString();
  }

  const rawMultisig = await queryMultisig(multisigAddress, callHash, indexer);
  let when = null;
  if (!rawMultisig.isSome) {
    if (isNil(indexer.extrinsicIndex)) {
      const msg = `Can not find multisig at ${indexer.blockHeight}`;
      logger.error(msg);
      throw new Error(msg);
    }

    when = {
      height: indexer.blockHeight,
      index: indexer.extrinsicIndex,
    };
  } else {
    when = rawMultisig.unwrap().when.toJSON();
  }

  const multisigId = generateMultisigId(multisigAddress, callHash, when);

  const { threshold, allSignatories } = extractSignatories(
    extrinsic,
    callHash,
    who,
  );
  if (!allSignatories) {
    logger.error(
      `Can not get all signatories for new multisig at ${indexer.blockHeight}`,
    );
    return;
  }

  await upsertMultiAccount(multisigAddress, threshold, allSignatories, indexer);

  let meta = {};
  if (rawMultisig.isSome) {
    meta = rawMultisig.toJSON();
  } else {
    meta = constructMetaWhenNoStorage(event, indexer, blockEvents);
  }

  await safeInsertMultisig({
    id: multisigId,
    multisigAddress,
    allSignatories: allSignatories?.length,
    signatories: allSignatories,
    threshold,
    ...meta,
    callHash,
    ...(await extractCall(extrinsic, callHash, indexer)),
    state: {
      name: MultisigStateType.Approving,
      sortValue: 1,
      args: {
        approving: meta.approvals?.length,
        threshold,
        allSignatories: allSignatories?.length,
      },
    },
    indexer,
    updateAt: indexer,
    isFinal: false,
  });

  await insertMultisigTimelineItem({
    multisigId,
    multisig: {
      id: multisigAddress,
      callHash,
      ...when,
    },
    type: TimelineItemTypes.event,
    name: event.method,
    args: {
      approving: event.data[0].toString(),
      callHash,
    },
    indexer,
  });
}

module.exports = {
  handleNewMultisig,
};
