const { getForeignAssetsSection } = require("../../../consts/section");
const {
  store: { setKnownHeightMark },
} = require("@statescan/common");
const { handleTransferred } = require("./transferred");
const { handleCreated } = require("./created");
const { handleForceCreated } = require("./forceCreated");
const { handleMetadataSet } = require("./metadataSet");
const { handleMetadataCleared } = require("./metadataCleared");
const {
  updateForeignAssetCommon,
  updateForeignAssetNoTimeline,
} = require("./common/updateForeignAsset");
const { handleTransferredApproved } = require("./transferredApproved");
const { handleDestroyed } = require("./destroyed");
const { handleBlocked } = require("./blocked");
const { handleTouched } = require("./touched");
const { addAssetAddresses } = require("../../../store/assetsAccounts");

async function handleForeignAssetsEvent(event, indexer) {
  const { section, method } = event;
  if (section !== getForeignAssetsSection()) {
    return;
  }

  setKnownHeightMark(indexer.blockHeight);
  if (method === "Created") {
    await handleCreated(event, indexer);
  } else if (method === "ForceCreated") {
    await handleForceCreated(event, indexer);
  } else if (method === "MetadataSet") {
    await handleMetadataSet(event, indexer);
  } else if (method === "Issued") {
    await updateForeignAssetNoTimeline(event, indexer);
    const { data } = event;
    const beneficiary = data[1].toString();
    addAssetAddresses(indexer.blockHash, data[0].hash.toString(), [
      beneficiary,
    ]);
  } else if (method === "Burned") {
    await updateForeignAssetNoTimeline(event, indexer);
    const { data } = event;
    const owner = data[1].toString();
    addAssetAddresses(indexer.blockHash, data[0].hash.toString(), [owner]);
  } else if (method === "TeamChanged") {
    const { data } = event;
    await updateForeignAssetCommon(event, indexer, {
      issuer: data[1].toString(),
      admin: data[1].toString(),
      freezer: data[2].toString(),
    });
  } else if (method === "OwnerChanged") {
    await updateForeignAssetCommon(event, indexer, {
      owner: event.data[1].toString(),
    });
  } else if (method === "Frozen") {
    addAssetAddresses(indexer.blockHash, event.data[0].hash.toString(), [
      event.data[1].toString(),
    ]);
  } else if (method === "Thawed") {
    addAssetAddresses(indexer.blockHash, event.data[0].hash.toString(), [
      event.data[1].toString(),
    ]);
  } else if (method === "AssetFrozen") {
    await updateForeignAssetCommon(event, indexer);
  } else if (method === "AssetThawed") {
    await updateForeignAssetCommon(event, indexer);
  } else if (method === "Transferred") {
    await handleTransferred(event, indexer);
  } else if (method === "MetadataCleared") {
    await handleMetadataCleared(event, indexer);
  } else if (method === "AssetStatusChanged") {
    await updateForeignAssetCommon(event, indexer);
  } else if (method === "AssetMinBalanceChanged") {
    const newMinBalance = event.data[1].toBigInt().toString();
    await updateForeignAssetCommon(event, indexer, { newMinBalance });
  } else if (method === "ApprovedTransfer") {
    await updateForeignAssetNoTimeline(event, indexer);
  } else if (method === "ApprovalCancelled") {
    await updateForeignAssetNoTimeline(event, indexer);
  } else if (method === "TransferredApproved") {
    await handleTransferredApproved(event, indexer);
  } else if (method === "Touched") {
    await handleTouched(event, indexer);
  } else if (method === "Blocked") {
    await handleBlocked(event, indexer);
  } else if (method === "Destroyed") {
    await handleDestroyed(event, indexer);
  } else if (method === "DestructionStarted") {
    await updateForeignAssetCommon(event, indexer);
  } else if (method === "AccountsDestroyed") {
    const accountsDestroyed = event.data[1].toNumber();
    const accountsRemaining = event.data[2].toNumber();
    await updateForeignAssetCommon(event, indexer, {
      accountsDestroyed,
      accountsRemaining,
    });
  } else if (method === "ApprovalsDestroyed") {
    const approvalsDestroyed = event.data[1].toNumber();
    const approvalsRemaining = event.data[2].toNumber();
    await updateForeignAssetCommon(event, indexer, {
      approvalsDestroyed,
      approvalsRemaining,
    });
  }
}

module.exports = {
  handleForeignAssetsEvent,
};
