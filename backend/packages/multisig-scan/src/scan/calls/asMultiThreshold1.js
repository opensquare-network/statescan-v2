const {
  chain: { findBlockApi },
  utils: { calcMultisigAddress },
  call: { normalizeCall },
  consts: { TimelineItemTypes, Modules },
} = require("@osn/scan-common");
const {
  multisig: { insertMultisig, insertMultisigTimelineItem, upsertMultiAccount },
} = require("@statescan/mongo");
const {
  consts: { MultisigStateType },
} = require("@statescan/common");
const { generateMultisigId } = require("../common/multisig");

function getMultisigAddressFromEvents(wrappedEvents) {
  const events = wrappedEvents.events || [];
  const newMultisigEvents = events.filter((e) => {
    const { section, method } = e.event;
    return (
      method === "NewMultisig" && ["multisig", "utility"].includes(section)
    );
  });

  if (newMultisigEvents.length === 1) {
    const event = newMultisigEvents[0];
    const data = event.event.data;
    return data[1].toString();
  }
}

async function handleAsMultiThreshold1(
  call,
  signer,
  extrinsicIndexer,
  wrappedEvents,
) {
  const { section, method } = call;
  const targetMethodName = "asMultiThreshold1";
  if (
    ![Modules.Multisig, Modules.Utility].includes(section) ||
    targetMethodName !== method
  ) {
    return;
  }

  const otherSignatories = call.args[0].toJSON();
  const allSignatories = [...otherSignatories, signer];
  const blockApi = await findBlockApi(extrinsicIndexer.blockHash);
  let multisigAddress = getMultisigAddressFromEvents(wrappedEvents);
  if (!multisigAddress) {
    multisigAddress = calcMultisigAddress(
      [...otherSignatories, signer],
      1,
      blockApi.registry.chainSS58,
    );
  }

  await upsertMultiAccount(
    multisigAddress,
    1,
    allSignatories,
    extrinsicIndexer,
  );

  const callHash = call.args[1].hash.toString();
  const when = {
    height: extrinsicIndexer.blockHeight,
    index: extrinsicIndexer.extrinsicIndex,
  };
  const multisigId = generateMultisigId(multisigAddress, callHash, when);
  const meta = {
    when,
    deposit: 0,
    depositor: signer,
    approvals: [signer],
  };
  const result = {
    isOk: true,
    ok: [],
  };
  await insertMultisig({
    id: multisigId,
    multisigAddress,
    threshold: 1,
    allSignatories: allSignatories?.length,
    signatories: allSignatories,
    ...meta,
    callHash,
    call: normalizeCall(call.args[1]),
    state: {
      name: MultisigStateType.Executed,
      sortValue: 2,
      args: { result },
    },
    indexer: extrinsicIndexer,
    updateAt: extrinsicIndexer,
    isFinal: true,
  });

  await insertMultisigTimelineItem({
    multisigId,
    multisig: {
      id: multisigAddress,
      callHash,
      ...when,
    },
    type: TimelineItemTypes.extrinsic,
    name: targetMethodName,
    args: {
      approving: signer,
      result,
    },
    indexer: extrinsicIndexer,
  });
}

module.exports = {
  handleAsMultiThreshold1,
};
