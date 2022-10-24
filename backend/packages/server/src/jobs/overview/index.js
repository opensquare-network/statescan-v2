const {
  block: { getBlockDb, getExtrinsicCollection },
  asset: { getTransferCollection },
  account: { getAddressCollection },
} = require("@statescan/mongo");

const overview = {};

async function updateHeightsAndIssuance() {
  const col = await getBlockDb().getStatusCol();
  const latest = await col.findOne({ name: "latestHeight" });
  const finalized = await col.findOne({ name: "finalizedHeight" });
  const issuance = await col.findOne({ name: "totalIssuance" });
  if (latest) {
    overview.latestHeight = latest.value;
  }
  if (finalized) {
    overview.finalizedHeight = finalized.value;
  }
  if (issuance) {
    overview.totalIssuance = issuance.value;
  }
}

async function updateSignedExtrinsics() {
  const col = await getExtrinsicCollection();
  overview.signedExtrinsics = await col.count({ isSigned: true });
}

async function updateTransfers() {
  const col = await getTransferCollection();
  overview.transfers = await col.estimatedDocumentCount();
}

async function updateAccounts() {
  const col = await getAddressCollection();
  overview.accounts = await col.estimatedDocumentCount();
}

async function updateAll() {
  await updateHeightsAndIssuance();
  await updateSignedExtrinsics();
  await updateTransfers();
  await updateAccounts();
}

async function updateOverview() {
  try {
    await updateAll();
  } finally {
    setTimeout(updateOverview, 6000);
  }
}

function getOverview() {
  return overview;
}

module.exports = {
  updateOverview,
  getOverview,
};
