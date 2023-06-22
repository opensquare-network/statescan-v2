const { queryRegistrars } = require("../../../query");
const { getRegistrar } = require("../../../common");
const { addBlockAccount } = require("../../../../store");
const { REQUEST_STATUS } = require("../../../constants");
const {
  updateJudgementRequest,
  getPendingRequest,
  insertRequestTimeline,
} = require("../../../mongo");
const {
  call: { findTargetCall },
} = require("@osn/scan-common");

async function handleJudgementGiven(event, indexer, extrinsic) {
  const target = event.data[0].toString();
  const registrarIndex = event.data[1].toNumber();
  addBlockAccount(indexer.blockHash, target);

  const pendingRequest = await getPendingRequest(target, registrarIndex);
  await updateJudgementRequest(target, registrarIndex, {
    status: {
      name: REQUEST_STATUS.GIVEN,
      indexer,
    },
    isFinal: true,
  });

  if (!pendingRequest) {
    return;
  }

  const call = findTargetCall(extrinsic.method, (call) => {
    const { section, method, args: callArgs } = call;
    return (
      "identity" === section &&
      "provideJudgement" === method &&
      callArgs[0].toNumber() === registrarIndex &&
      callArgs[1].toString() === target
    );
  });

  const judgement = call.args[2].toString();
  const rawRegistrars = await queryRegistrars(indexer);
  const args = { judgement };
  const byWho = getRegistrar(rawRegistrars, registrarIndex, indexer);
  if (byWho) {
    args.byWho = byWho;
  }

  const requestHeight = pendingRequest.indexer?.blockHeight;
  await insertRequestTimeline({
    account: target,
    registrarIndex,
    requestHeight,
    indexer,
    name: event.method,
    args,
  });
}

module.exports = {
  handleJudgementGiven,
};
