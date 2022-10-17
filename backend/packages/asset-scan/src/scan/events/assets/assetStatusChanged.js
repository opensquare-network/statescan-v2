const { AssetsModule, AssetsMethods } = require("./consts");
const { updateAsset } = require("./common/updateAsset");
const {
  call: { findTargetCall },
} = require("@osn/scan-common");

async function handleAssetStatusChanged(event, indexer, extrinsic) {
  const assetId = event.data[0].toNumber();
  const args = {};
  const call = findTargetCall(extrinsic.method, (call) => {
    const { section, method, args: callArgs } = call;
    return (
      section === AssetsModule &&
      method === AssetsMethods.forceAssetStatus &&
      callArgs[0].toNumber() === assetId
    );
  });

  const { args: callArgs } = call;
  Object.assign(args, {
    owner: callArgs[1].toString(),
    issuer: callArgs[2].toString(),
    admin: callArgs[3].toString(),
    freezer: callArgs[4].toString(),
    minBalance: callArgs[5].toString(),
    isSufficient: callArgs[6].toJSON(),
    isFrozen: callArgs[6].toJSON(),
  });
  await updateAsset(event, indexer, args);
}

module.exports = {
  handleAssetStatusChanged,
};
