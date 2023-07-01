const { insertIdentityTimeline } = require("../mongo");
const { addBlockAccount } = require("../../store");
const { dataAsString } = require("../utils");
const { busLogger } = require("@osn/scan-common");

async function handleRenameSub(call, signer, extrinsicIndexer) {
  const { section, method } = call;
  if ("identity" !== section || "renameSub" !== method) {
    return;
  }

  const sub = call.args[0].toString();
  const data = dataAsString(call.args[1]);
  addBlockAccount(extrinsicIndexer.blockHash, sub);
  await insertIdentityTimeline({
    account: sub,
    indexer: extrinsicIndexer,
    name: method,
    args: {
      parent: signer,
      data,
    },
  });

  if (!signer) {
    return;
  }

  addBlockAccount(extrinsicIndexer.blockHash, signer);
  await insertIdentityTimeline({
    account: signer,
    indexer: extrinsicIndexer,
    name: method,
    args: {
      sub,
      data,
    },
  });
}

async function wrappedHandle(call, signer, extrinsicIndexer) {
  try {
    await handleRenameSub(call, signer, extrinsicIndexer);
  } catch (e) {
    busLogger.error(
      `${extrinsicIndexer.blockHeight} handle rename_sub error:`,
      e,
    );
  }
}

module.exports = {
  handleRenameSub: wrappedHandle,
};
