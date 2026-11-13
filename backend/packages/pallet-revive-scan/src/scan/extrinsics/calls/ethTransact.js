const { logger } = require("@osn/scan-common");
const { parseEthereumTransaction } = require("../../common/ethereum");
const { saveCall } = require("./common/saveCall");

// revive.ethTransact(payload) carries an encoded ethereum transaction, which is an
// unsigned extrinsic, so the caller is recovered from the transaction signature.
async function handleEthTransact(extrinsic, extrinsicIndexer, isSuccess) {
  const payload = extrinsic.method.args[0]?.toU8a(true);
  if (!payload || payload.length <= 0) {
    return;
  }

  let transaction;
  try {
    transaction = parseEthereumTransaction(payload);
  } catch (e) {
    logger.error(
      `Error in parsing ethereum transaction at ${extrinsicIndexer.blockHeight}`,
      e,
    );
    return;
  }

  // A transaction without a recipient deploys a contract, which is recorded from the
  // `Instantiated` event instead.
  if (!transaction.to) {
    return;
  }

  await saveCall({
    section: extrinsic.method.section,
    method: extrinsic.method.method,
    caller: transaction.sender,
    dest: transaction.to,
    data: transaction.data,
    indexer: extrinsicIndexer,
    isSuccess,
  });
}

module.exports = {
  handleEthTransact,
};
