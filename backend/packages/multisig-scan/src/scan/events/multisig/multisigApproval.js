const { queryMultisig } = require("../../query/multisig");
const { generateMultisigId } = require("../../common/multisig");
const {
  multisig: { updateMultisig, insertMultisigTimelineItem },
} = require("@statescan/mongo");
const { extractCall } = require("./common/extractCall");
const {
  consts: { MultisigStateType },
  logger,
} = require("@statescan/common");
const { extractSignatories } = require("./common/extractThreshold");

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
  const rawMultisig = await queryMultisig(multisigAccount, callHash, indexer);
  const meta = rawMultisig.toJSON();
  await updateMultisig(
    multisigId,
    {
      ...meta,
      ...extractCall(extrinsic, callHash),
      state: {
        name: MultisigStateType.Executed,
        args: {
          approving: meta.approvals?.length,
          threshold,
          allSignatories: allSignatories?.length,
        },
      },
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
    },
    indexer,
  });
}

module.exports = {
  handleMultisigApproval,
};
