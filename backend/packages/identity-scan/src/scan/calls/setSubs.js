const { addBlockAccount } = require("../../store");
const { insertIdentityTimeline } = require("../mongo");
const { dataAsString } = require("../utils");
const { busLogger } = require("@osn/scan-common");

async function handleSetSubs(call, signer, extrinsicIndexer) {
  const { section, method } = call;
  if ("identity" !== section || "setSubs" !== method) {
    return;
  }

  const subs = call.args[0];
  let normalizedSubs = [];
  for (const [rawSub, rawData] of subs) {
    const subAccount = rawSub.toString();
    const data = dataAsString(rawData);
    addBlockAccount(extrinsicIndexer.blockHash, subAccount);

    normalizedSubs.push({ account: subAccount, data });
    await insertIdentityTimeline({
      account: subAccount,
      indexer: extrinsicIndexer,
      name: method,
      args: {
        parent: signer,
        data,
      },
    });
  }

  if (signer) {
    addBlockAccount(extrinsicIndexer.blockHash, signer);
    await insertIdentityTimeline({
      account: signer,
      indexer: extrinsicIndexer,
      name: method,
      args: { subs: normalizedSubs },
    });
  }
}

async function wrappedHandle(call, signer, extrinsicIndexer) {
  try {
    await handleSetSubs(call, signer, extrinsicIndexer);
  } catch (e) {
    busLogger.error(
      `${extrinsicIndexer.blockHeight} handle set_subs error:`,
      e,
    );
  }
}

module.exports = {
  handleSetSubs: wrappedHandle,
};
