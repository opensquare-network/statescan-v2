const {
  queryRegistrars,
  queryIdentityInfoByHeight,
} = require("../../../query");
const { getRegistrar } = require("../../../common");
const { addBlockAccount } = require("../../../../store");
const { REQUEST_STATUS } = require("../../../constants");
const {
  updateJudgementRequest,
  insertRequestTimeline,
  insertIdentityTimeline,
  incJudgementGiven,
} = require("../../../mongo");
const {
  call: { findTargetCall },
  busLogger: logger,
} = require("@osn/scan-common");
const { getPendingRequest } = require("../../../mongo/request");
const { incRegistrarStats } = require("../../../mongo/registrar");
const { RegistrarStatKeys } = require("../../../common/consts");

async function calcFee(target, registrarIndex, indexer) {
  const identity = await queryIdentityInfoByHeight(
    target,
    indexer.blockHeight - 1,
  );
  if (!identity.isSome) {
    return 0;
  }

  const unwrapped = identity.unwrap();
  const judgements = Array.isArray(unwrapped)
    ? unwrapped[0].judgements
    : unwrapped.judgements;
  const judgementTuple = judgements.find(
    ([rawIndex]) => rawIndex.toNumber() === registrarIndex,
  );
  if (!judgementTuple) {
    return 0;
  }

  const judgement = judgementTuple[1];
  if (judgement.isFeePaid) {
    return judgement.asFeePaid.toJSON();
  }

  return 0;
}

async function handleJudgementGiven(event, indexer, extrinsic) {
  const target = event.data[0].toString();
  const registrarIndex = event.data[1].toNumber();
  addBlockAccount(indexer.blockHash, target);
  await incJudgementGiven(indexer);

  const pendingRequest = await getPendingRequest(target, registrarIndex);

  const rawRegistrars = await queryRegistrars(indexer);
  const byWho = getRegistrar(rawRegistrars, registrarIndex, indexer);
  const fee = await calcFee(target, registrarIndex, indexer);
  let judgement;
  if (extrinsic.method) {
    const call = findTargetCall(extrinsic.method, (call) => {
      const { section, method, args: callArgs } = call;
      return (
        "identity" === section &&
        "provideJudgement" === method &&
        callArgs[0].toNumber() === registrarIndex &&
        callArgs[1].toString() === target
      );
    });

    if (call) {
      judgement = call.args[2].toString();
    } else {
      logger.error(
        `Can not find call when judgement given at ${indexer.blockHeight}`,
      );
    }
  } else {
    // todo: get judgement by querying storage
    logger.error(`Judgement given without extrinsic at ${indexer.blockHeight}`);
  }

  let args = {
    byWho,
    fee,
  };
  if (judgement) {
    Object.assign(args, { judgement });
  }
  await updateJudgementRequest(target, registrarIndex, {
    fee,
    finalHeight: indexer.blockHeight,
    status: {
      name: REQUEST_STATUS.GIVEN,
      indexer,
      args,
    },
    isFinal: true,
  });

  await insertIdentityTimeline({
    account: target,
    indexer,
    name: event.method,
    args: {
      registrarIndex,
      registrarAddress: byWho,
      judgement,
      fee,
    },
  });

  if (pendingRequest) {
    const requestHeight = pendingRequest.indexer?.blockHeight;
    await insertRequestTimeline({
      account: target,
      registrarIndex,
      requestHeight,
      indexer,
      name: event.method,
      args,
    });
  } else {
    logger.error(
      `Can not find request when judgement given at ${indexer.blockHeight}`,
    );
  }

  await incRegistrarStats(registrarIndex, RegistrarStatKeys.fee, fee, indexer);
  await incRegistrarStats(registrarIndex, RegistrarStatKeys.given, 1, indexer);
}

module.exports = {
  handleJudgementGiven,
};
