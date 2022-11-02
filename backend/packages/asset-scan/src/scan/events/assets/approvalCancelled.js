const { updateApproval } = require("../../../service/assets/approval");

async function handleApprovalCancelled(event, indexer) {
  await updateApproval(
    event.data[0].toNumber(),
    event.data[1].toString(),
    event.data[2].toString(),
    indexer,
  );
}

module.exports = {
  handleApprovalCancelled,
};
