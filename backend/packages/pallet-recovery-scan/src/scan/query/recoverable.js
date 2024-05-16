const {
  chain: { findBlockApi },
} = require("@osn/scan-common");
const { getRecoverySection } = require("../common/section");

async function queryRecoverable(blockHash, who) {
  const section = getRecoverySection();
  const blockApi = await findBlockApi(blockHash);
  const raw = await blockApi.query[section].recoverable(who);
  if (raw.isSome) {
    return raw.toJSON();
  } else {
    return null;
  }
}

module.exports = {
  queryRecoverable,
};
