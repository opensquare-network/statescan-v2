const {
  chain: { findBlockApi },
} = require("@osn/scan-common");
const { getRecoverySection } = require("../common/section");

async function queryRecovery(blockHash, lostAccount, rescuerAccount) {
  const section = getRecoverySection();
  const blockApi = await findBlockApi(blockHash);
  const raw = await blockApi.query[section].activeRecoveries(
    lostAccount,
    rescuerAccount,
  );
  if (raw.isSome) {
    return raw.toJSON();
  } else {
    return null;
  }
}

module.exports = {
  queryRecovery,
};
