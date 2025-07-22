const { generateMultisigId } = require("../../common/multisig");
const {
  multisig: { updateMultisig, insertMultisigTimelineItem, getMultisigById },
} = require("@statescan/mongo");
const {
  consts: { MultisigStateType },
} = require("@statescan/common");
const { extractCall } = require("./common/extractCall");
const { sortApprovals } = require("./common/sortApprovals");
const { normalizeDispatchResult } = require("./common/normalizeDispatchResult");
const {
  consts: { TimelineItemTypes, Modules },
} = require("@osn/scan-common");
const {
  getCallHashFromExtrinsic,
} = require("./common/getCallHashFromExtrinsic");

function isFromAsMultiThreshold1(extrinsic) {
  const { section, method } = extrinsic.method;
  return Modules.Multisig === section && "asMultiThreshold1" === method;
}

async function handleMultisigExecuted(event, indexer, extrinsic) {
  const approving = event.data[0].toString();
  const when = event.data[1].toJSON();
  const multisigAccount = event.data[2].toString();
  let callHash, result;
  if (event.data.length <= 4) {
    // For kusama spec 1055, `NewMultisig` event has no callHash argument
    callHash = await getCallHashFromExtrinsic(extrinsic, indexer); // it's a workaround, not perfect.
    result = normalizeDispatchResult(event.data[3], indexer);
  } else {
    callHash = event.data[3].toString();
    result = normalizeDispatchResult(event.data[4], indexer);
  }

  const multisigId = generateMultisigId(multisigAccount, callHash, when);
  const multisigInDb = await getMultisigById(multisigId);
  if (!multisigInDb) {
    if (isFromAsMultiThreshold1(extrinsic)) {
      return;
    } else {
      throw new Error(
        `Can not find multisig from DB when executed at ${indexer.blockHeight}`,
      );
    }
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
        sortValue: 2,
        args: {
          result,
        },
      },
      updateAt: indexer,
      isFinal: true,
    },
    indexer,
  );
}

module.exports = {
  handleMultisigExecuted,
};
