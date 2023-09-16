const { generateMultisigId } = require("../../common/multisig");
const {
  busLogger: logger,
  consts: { MultisigStateType },
} = require("@statescan/common");
const {
  multisig: {
    updateMultisig,
    insertMultisigTimelineItem,
    getUnFinalMultisigById,
  },
} = require("@statescan/mongo");
const {
  consts: { TimelineItemTypes },
} = require("@osn/scan-common");

async function handleMultisigCancelled(event, indexer) {
  const cancelling = event.data[0].toString();
  const when = event.data[1].toJSON();
  const multisigAccount = event.data[2].toString();
  const callHash = event.data[3].toString();

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
      state: {
        name: MultisigStateType.Cancelled,
        args: {
          cancelling,
        },
      },
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
    type: TimelineItemTypes.event,
    name: event.method,
    args: {
      cancelling,
    },
    indexer,
  });
}

module.exports = {
  handleMultisigCancelled,
};
