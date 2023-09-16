const { generateMultisigId } = require("../../common/multisig");
const {
  multisig: {
    updateMultisig,
    insertMultisigTimelineItem,
    getUnFinalMultisigById,
  },
} = require("@statescan/mongo");
const { busLogger: logger } = require("@statescan/common");
const { extractCall } = require("./common/extractCall");

function sortApprovals(approvals = []) {
  const arr = [...new Set(approvals)];
  return arr.sort((a, b) => (a > b ? 1 : -1));
}

async function handleMultisigExecuted(event, indexer, extrinsic) {
  const approving = event.data[0].toString();
  const when = event.data[1].toJSON();
  const multisigAccount = event.data[2].toString();
  const callHash = event.data[3].toString();
  const result = event.data[4].toJSON();

  const multisigId = generateMultisigId(multisigAccount, callHash, when);
  const multisigInDb = await getUnFinalMultisigById(multisigId);
  if (!multisigInDb) {
    logger.error(
      `Can not find multisig from DB when executed at ${indexer.blockHeight}`,
    );
    return;
  }

  await updateMultisig(
    multisigId,
    {
      approvals: sortApprovals([...multisigInDb.approvals, approving]),
      ...extractCall(extrinsic, callHash),
      result,
      isFinal: true,
    },
    indexer,
  );

  await insertMultisigTimelineItem({
    multisigId,
    multisig: {
      id: multisigAccount,
      callHash,
      ...when,
    },
    name: event.method,
    args: {
      approving: event.data[0].toString(),
      result,
    },
    indexer,
  });
}

module.exports = {
  handleMultisigExecuted,
};
