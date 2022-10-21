const { normalizeData } = require("../utils/normalizeAccountData");
const {
  chain: { getApi },
} = require("@osn/scan-common");
const { getAccountStorageKey } = require("./accountStorageKey");

async function getOnChainAccounts(addrs = []) {
  const uniqueAddrs = [...new Set(addrs)];
  const keys = uniqueAddrs.map(getAccountStorageKey);
  const api = await getApi();
  const storages = await api.rpc.state.queryStorageAt(keys);

  return uniqueAddrs.reduce(
    (result, address, idx) => {
      const { notExistedAddrs = [], existedAddrs = [] } = result;
      const storage = storages[idx];
      if (storage.isNone) {
        notExistedAddrs.push(address);
        return { notExistedAddrs, existedAddrs };
      }

      const accountInfo = api.registry.createType(
        "AccountInfo",
        storage.toHex(),
        true,
      );
      const detail = accountInfo.toJSON();
      existedAddrs.push({
        address,
        detail: {
          detail,
          data: normalizeData(detail.data),
        },
      });
      return { notExistedAddrs, existedAddrs };
    },
    { notExistedAddrs: [], existedAddrs: [] },
  );
}

module.exports = {
  getOnChainAccounts,
};
