const { updateApproval } = require("../../../../jobs/approval/update");
const { updateAssetDetail } = require("../common/updateAssetDetail");

async function handleApprovedTransfer(event, indexer) {
  const assetId = event.data[0].toNumber();
  const owner = event.data[1].toString();
  const delegate = event.data[2].toString();

  await updateAssetDetail(assetId, indexer);
  await updateApproval(assetId, owner, delegate, indexer);
}

module.exports = {
  handleApprovedTransfer,
};
