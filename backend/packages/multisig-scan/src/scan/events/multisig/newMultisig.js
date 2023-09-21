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

async function handleNewMultisig(event, indexer, extrinsic) {
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
  if (!rawMultisig.isSome) {
    const msg = `Can not find multisig at ${indexer.blockHeight}`;
    logger.error(msg);
    throw new Error(msg);
  }

  const when = rawMultisig.unwrap().when.toJSON();
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
  }

  await upsertMultiAccount(multisigAddress, threshold, allSignatories, indexer);

  const meta = rawMultisig.toJSON();
  await insertMultisig({
    id: multisigId,
    multisigAddress,
    allSignatories: allSignatories?.length,
    threshold,
    ...meta,
    callHash,
    ...(await extractCall(extrinsic, callHash, indexer)),
    state: {
      name: MultisigStateType.Approving,
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
