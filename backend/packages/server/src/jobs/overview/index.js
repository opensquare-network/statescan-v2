const {
  block: { getBlockDb, getExtrinsicCollection },
  asset: { getAssetCol, getTransferCollection },
  account: { getAddressCollection },
  uniques: { getClassCol, getInstanceCol },
} = require("@statescan/mongo");
const { isAssetsChain, isUniquesChain } = require("../../env");

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

async function updateAssets() {
  const col = await getAssetCol();
  overview.assets = await col.countDocuments({ destroyed: false });
}

async function updateNftClasses() {
  const col = await getClassCol();
  const total = await col.countDocuments({ isDestroyed: false });
  const valid = await col.countDocuments({
    isDestroyed: false,
    definitionValid: true,
  });
  overview.nftClasses = { valid, total };
}

async function updateNftInstances() {
  const col = await getInstanceCol();
  const total = await col.countDocuments({ isDestroyed: false });
  const valid = await col.countDocuments({
    isDestroyed: false,
    isClassDestroyed: false,
    $or: [
      { definitionValid: true },
      { definitionValid: null, classDefinitionValid: true },
    ],
  });
  overview.nftInstances = { valid, total };
}

async function updateAll() {
  await updateHeightsAndIssuance();
  await updateSignedExtrinsics();
  await updateTransfers();
  await updateAccounts();

  if (isAssetsChain()) {
    await updateAssets();
  }

  if (isUniquesChain()) {
    await updateNftClasses();
    await updateNftInstances();
  }
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
