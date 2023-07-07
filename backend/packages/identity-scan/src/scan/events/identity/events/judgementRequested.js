const { REQUEST_STATUS } = require("../../../constants");
const {
  insertJudgementRequest,
  insertRequestTimeline,
} = require("../../../mongo");
const { handleJudgementCommon } = require("./common");
const {
  call: { findTargetCall },
} = require("@osn/scan-common");
const {
  utils: { toDecimal128 },
} = require("@statescan/common");

async function handleJudgementRequested(event, indexer, extrinsic) {
  const {
    account,
    registrar: { index: registrarIndex, account: registrar },
  } = await handleJudgementCommon(event, indexer);

  let maxFee;
  if (extrinsic) {
    const call = findTargetCall(extrinsic.method, (call) => {
      const { section, method, args: callArgs } = call;
      return (
        "identity" === section &&
        "requestJudgement" === method &&
        callArgs[0].toNumber() === registrarIndex
      );
    });

    if (call) {
      maxFee = call.args[1].toString();
    }
  }

  let args = { registrarIndex };
  if (maxFee) {
    args = { ...args, maxFee };
  }
  await insertJudgementRequest({
    account,
    registrarIndex,
    registrar,
    indexer,
    maxFee: toDecimal128(maxFee),
    status: {
      name: REQUEST_STATUS.PENDING,
      indexer,
      args,
    },
    isFinal: false,
  });

  await insertRequestTimeline({
    account,
    registrarIndex,
    requestHeight: indexer.blockHeight,
    indexer,
    name: event.method,
    args,
  });
}

module.exports = {
  handleJudgementRequested,
};
