const { generateMultisigId } = require("../../common/multisig");
const {
  multisig: {
    updateMultisig,
    insertMultisigTimelineItem,
    getUnFinalMultisigById,
  },
} = require("@statescan/mongo");
const {
  busLogger: logger,
  consts: { MultisigStateType },
} = require("@statescan/common");
const { extractCall } = require("./common/extractCall");
const { sortApprovals } = require("./common/sortApprovals");
const { normalizeDispatchResult } = require("./common/normalizeDispatchResult");
const {
  consts: { TimelineItemTypes },
} = require("@osn/scan-common");

async function handleMultisigExecuted(event, indexer, extrinsic) {
  const approving = event.data[0].toString();
  const when = event.data[1].toJSON();
  const multisigAccount = event.data[2].toString();
  const callHash = event.data[3].toString();
  const result = normalizeDispatchResult(event.data[4]);

  const multisigId = generateMultisigId(multisigAccount, callHash, when);
  const multisigInDb = await getUnFinalMultisigById(multisigId);
  if (!multisigInDb) {
    logger.error(
      `Can not find multisig from DB when executed at ${indexer.blockHeight}`,
    );
    return;
  }

  await insertMultisigTimelineItem({
    multisigId,
    multisig: {
      id: multisigAccount,
      callHash,
      ...when,
    },
    type: TimelineItemTypes.event,
    name: event.method,
    args: {
      approving: event.data[0].toString(),
      result,
    },
    indexer,
  });

  await updateMultisig(
    multisigId,
    {
      approvals: sortApprovals([...multisigInDb.approvals, approving]),
      ...(await extractCall(extrinsic, callHash, indexer)),
      state: {
        name: MultisigStateType.Executed,
        args: {
          result,
        },
      },
      isFinal: true,
    },
    indexer,
  );
}

module.exports = {
  handleMultisigExecuted,
};
