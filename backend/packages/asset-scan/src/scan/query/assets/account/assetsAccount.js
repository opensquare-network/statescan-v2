const {
  chain: { findBlockApi, getApi },
} = require("@osn/scan-common");
const { getAssetAccountStorageKey } = require("./key");
const {
  utils: { toDecimal128 },
} = require("@statescan/common");

async function queryAssetsAccounts(assetId, addresses = [], blockHash) {
  if (addresses.length <= 0) {
    return [];
  }

  const api = await getApi();
  const blockApi = await findBlockApi(blockHash);
  const registry = blockApi.registry;
  const keys = addresses.map((address) =>
    getAssetAccountStorageKey(assetId, address, registry),
  );
  const storageArray = await api.rpc.state.queryStorageAt(keys, blockHash);

  return addresses.map((address, index) => {
    const storage = storageArray[index];
    let info = registry.createType("AssetBalance", storage.toHex(), true);

    return {
      address,
      info: {
        ...info.toJSON(),
        balance: toDecimal128(info.balance.toString()),
      },
    };
  });
}

module.exports = {
  queryAssetsAccounts,
};
