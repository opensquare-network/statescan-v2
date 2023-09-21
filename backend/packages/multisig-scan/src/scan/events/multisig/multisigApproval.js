const { queryMultisig } = require("../../query/multisig");
const { generateMultisigId } = require("../../common/multisig");
const {
  multisig: { updateMultisig, insertMultisigTimelineItem, getMultisigById },
} = require("@statescan/mongo");
const { extractCall } = require("./common/extractCall");
const {
  consts: { MultisigStateType },
} = require("@statescan/common");
const { extractSignatories } = require("./common/extractThreshold");
const {
  consts: { TimelineItemTypes },
  busLogger: logger,
} = require("@osn/scan-common");
const { sortApprovals } = require("./common/sortApprovals");

async function handleMultisigApproval(event, indexer, extrinsic) {
  const who = event.data[0].toString();
  const when = event.data[1].toJSON();
  const multisigAccount = event.data[2].toString();
  const callHash = event.data[3].toString();

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

  const multisigId = generateMultisigId(multisigAccount, callHash, when);
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
    },
    indexer,
  });

  const rawMultisig = await queryMultisig(multisigAccount, callHash, indexer);
  let metaUpdates = {};
  if (rawMultisig.isSome) {
    metaUpdates = rawMultisig.toJSON();
  } else {
    const multisigInDb = await getMultisigById(multisigId);
    if (!multisigInDb) {
      throw new Error(
        `Can not find multisig from DB when executed at ${indexer.blockHeight}`,
      );
    } else {
      metaUpdates = {
        approvals: sortApprovals([...multisigInDb.approvals, who]),
      };
    }
  }
  await updateMultisig(
    multisigId,
    {
      ...metaUpdates,
      ...(await extractCall(extrinsic, callHash, indexer)),
      state: {
        name: MultisigStateType.Approving,
        args: {
          approving: metaUpdates.approvals?.length,
          threshold,
          allSignatories: allSignatories?.length,
        },
      },
      updateAt: indexer,
    },
    indexer,
  );
}

module.exports = {
  handleMultisigApproval,
};
