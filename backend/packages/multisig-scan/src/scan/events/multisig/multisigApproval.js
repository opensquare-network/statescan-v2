const { queryMultisig } = require("../../query/multisig");
const { generateMultisigId } = require("../../common/multisig");
const {
  multisig: { updateMultisig, insertMultisigTimelineItem },
} = require("@statescan/mongo");
const { extractCall } = require("./common/extractCall");

async function handleMultisigApproval(event, indexer, extrinsic) {
  const when = event.data[1].toJSON();
  const multisigAccount = event.data[2].toString();
  const callHash = event.data[3].toString();

  const multisigId = generateMultisigId(multisigAccount, callHash, when);
  const rawMultisig = await queryMultisig(multisigAccount, callHash, indexer);
  await updateMultisig(
    multisigId,
    {
      ...rawMultisig.toJSON(),
      ...extractCall(extrinsic, callHash),
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
