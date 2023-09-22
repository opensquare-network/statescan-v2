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

async function handleAsMultiThreshold1(call, signer, extrinsicIndexer) {
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
  const multisigAddress = calcMultisigAddress(
    [...otherSignatories, signer],
    1,
    blockApi.registry.chainSS58,
  );

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
    ...meta,
    callHash,
    call: normalizeCall(call.args[1]),
    state: {
      name: MultisigStateType.Executed,
      args: { result },
    },
    indexer: extrinsicIndexer,
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
