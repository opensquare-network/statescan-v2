const AssetsModule = "assets";

const AssetsEvents = Object.freeze({
  // Asset state
  Created: "Created",
  MetadataSet: "MetadataSet",
  MetadataCleared: "MetadataCleared",
  ForceCreated: "ForceCreated",
  AssetStatusChanged: "AssetStatusChanged",
  TeamChanged: "TeamChanged",
  OwnerChanged: "OwnerChanged",
  AssetFrozen: "AssetFrozen",
  AssetThawed: "AssetThawed",
  Destroyed: "Destroyed",

  // Account
  Transferred: "Transferred",
  Frozen: "Frozen",
  Thawed: "Thawed",
  ApprovedTransfer: "ApprovedTransfer",
  ApprovalCancelled: "ApprovalCancelled",
  TransferredApproved: "TransferredApproved",

  // Asset & Account
  Issued: "Issued",
  Burned: "Burned",
});

const AssetsMethods = Object.freeze({
  forceAssetStatus: "forceAssetStatus",
});

module.exports = {
  AssetsEvents,
  AssetsMethods,
  AssetsModule,
};
