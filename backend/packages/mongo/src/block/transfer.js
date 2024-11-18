const { getTransferCol } = require("./db");

async function batchInsertTransfers(transfers = []) {
  if (transfers.length <= 0) {
    return;
  }

  const col = await getTransferCol();
  const bulk = col.initializeUnorderedBulkOp();
  for (const transfer of transfers) {
    bulk.insert(transfer);
  }
  await bulk.execute();
}

module.exports = {
  batchInsertTransfers,
};
