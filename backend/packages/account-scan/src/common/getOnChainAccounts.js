const { normalizeData } = require("../utils/normalizeAccountData");
const {
  chain: { getApi },
} = require("@osn/scan-common");
const { getAccountStorageKey } = require("./accountStorageKey");

async function getOnChainAccounts(addrs = []) {
  const uniqueAddrs = [...new Set(addrs)];
  const keys = uniqueAddrs.map(getAccountStorageKey);
  const api = await getApi();
  const result = await api.rpc.state.queryStorageAt(keys);
  const accountInfoHexArr = (result || []).map((i) => i.toHex());

  return uniqueAddrs.reduce((result, address, idx) => {
    const accountInfoHex = accountInfoHexArr[idx];
    if (!accountInfoHex) {
      return result;
    }

    const accountInfo = api.registry.createType(
      "AccountInfo",
      accountInfoHex,
      true
    );

    const detail = accountInfo.toJSON();
    const data = normalizeData(detail.data);
    result.push({
      addr: address,
      detail: {
        ...detail,
        data,
      }
    });
    return result;
  }, []);
}

module.exports = {
  getOnChainAccounts,
};
