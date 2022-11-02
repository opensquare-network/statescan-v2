const { AssetsModule, AssetsMethods } = require("./consts");
const { updateAsset } = require("./common/updateAsset");
const {
  call: { findTargetCall },
} = require("@osn/scan-common");

function getArgs(assetId, extrinsic) {
  if (!extrinsic) {
    return {};
  }

  const call = findTargetCall(extrinsic.method, (call) => {
    const { section, method, args: callArgs } = call;
    return (
      section === AssetsModule &&
      method === AssetsMethods.forceAssetStatus &&
      callArgs[0].toNumber() === assetId
    );
  });

  if (!call) {
    return {};
  }

  const { args } = call;
  return {
    owner: args[1].toString(),
    issuer: args[2].toString(),
    admin: args[3].toString(),
    freezer: args[4].toString(),
    minBalance: args[5].toString(),
    isSufficient: args[6].toJSON(),
    isFrozen: args[6].toJSON(),
  };
}

async function handleAssetStatusChanged(event, indexer, extrinsic) {
  const assetId = event.data[0].toNumber();
  await updateAsset(event, indexer, getArgs(assetId, extrinsic));
}

module.exports = {
  handleAssetStatusChanged,
};
