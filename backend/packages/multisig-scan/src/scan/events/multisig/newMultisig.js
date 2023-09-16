const { queryMultisig } = require("../../query/multisig");
const {
  multisig: { insertMultisig, insertMultisigTimelineItem },
} = require("@statescan/mongo");
const { busLogger: logger } = require("@statescan/common");
const { generateMultisigId } = require("../../common/multisig");
const { extractCall } = require("./common/extractCall");

async function handleNewMultisig(event, indexer, extrinsic) {
  const multisigAccount = event.data[1].toString();
  const callHash = event.data[2].toString();

  const rawMultisig = await queryMultisig(multisigAccount, callHash, indexer);
  if (!rawMultisig.isSome) {
    const msg = `Can not find multisig at ${indexer.blockHeight}`;
    logger.error(msg);
    throw new Error(msg);
  }

  const when = rawMultisig.unwrap().when.toJSON();
  const multisigId = generateMultisigId(multisigAccount, callHash, when);

  await insertMultisig({
    id: multisigId,
    ...rawMultisig.toJSON(),
    callHash,
    ...extractCall(extrinsic, callHash),
    indexer,
    isFinal: false,
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
      // todo: save deposit info
    },
    indexer,
  });
}

module.exports = {
  handleNewMultisig,
};
