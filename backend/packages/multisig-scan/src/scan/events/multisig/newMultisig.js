const { queryMultisig } = require("../../query/multisig");
const {
  multisig: { insertMultisig, insertMultisigTimelineItem },
} = require("@statescan/mongo");
const { busLogger: logger } = require("@statescan/common");
const { generateMultisigId } = require("../../common/multisig");

async function handleNewMultisig(event, indexer) {
  const multisigAccount = event.data[1].toString();
  const callHash = event.data[2].toString();

  const rawMultisig = await queryMultisig(multisigAccount, callHash, indexer);
  if (!rawMultisig.isSome) {
    const msg = `Can not find multisig at ${indexer.blockHeight}`;
    logger.error(msg);
    throw new Error(msg);
  }

  const when = rawMultisig.unwrap().when.toJSON();
  const multisigId = generateMultisigId(
    multisigAccount,
    callHash,
    when.height,
    when.index,
  );

  await insertMultisig({
    id: multisigId,
    ...rawMultisig.toJSON(),
  });

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
      callHash,
    },
    indexer,
  });
}

module.exports = {
  handleNewMultisig,
};
