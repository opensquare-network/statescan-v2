const { emptyFn } = require("@osn/scan-common/src/utils/emptyFn");
const {
  Modules,
  ProxyMethods,
  MultisigMethods,
  UtilityMethods,
} = require("@osn/scan-common/src/consts");
const { calcMultisigAddress } = require("@osn/scan-common/src/utils/multisig");

function findAuthorFromProxy(proxyCall, author, checkFn) {
  const real = proxyCall.args[0].toString();
  const innerCall = proxyCall.args[2];
  return findCallAuthor(innerCall, real, checkFn);
}

function findAuthorFromMultisig(multisigCall, author, checkFn) {
  const innerCall = multisigCall.args[3];
  const threshold = multisigCall.args[0].toNumber();
  const otherSignatories = multisigCall.args[1].toJSON();
  const multisigAddr = calcMultisigAddress(
    [author, ...otherSignatories],
    threshold,
    multisigCall.registry.chainSS58,
  );

  return findCallAuthor(innerCall, multisigAddr, checkFn);
}

function findAuthorFromBatch(batchCall, author, checkFn) {
  for (const innerCall of batchCall.args[0]) {
    const real = findCallAuthor(innerCall, author, checkFn);
    if (real) {
      return real;
    }
  }

  return null;
}

function findCallAuthor(call, author, checkFn = emptyFn) {
  if (checkFn(call)) {
    return author;
  }

  const { section, method } = call;
  if (Modules.Proxy === section && ProxyMethods.proxy === method) {
    return findAuthorFromProxy(...arguments);
  } else if (
    [Modules.Multisig, Modules.Utility].includes(section) &&
    MultisigMethods.asMulti === method
  ) {
    return findAuthorFromMultisig(...arguments);
  } else if (
    Modules.Utility === section &&
    [
      UtilityMethods.batch,
      UtilityMethods.batchAll,
      UtilityMethods.forceBatch,
    ].includes(method)
  ) {
    return findAuthorFromBatch(...arguments);
  }

  return null;
}

module.exports = {
  findTargetCallAuthor: findCallAuthor,
};
