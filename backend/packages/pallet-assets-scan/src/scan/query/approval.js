const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function queryApproval(blockHash, assetId, owner, delegate) {
  const blockApi = await findBlockApi(blockHash);

  const raw = await blockApi.query.assets.approvals(assetId, owner, delegate);
  if (raw.isSome) {
    const unwrapped = raw.unwrap();
    const json = raw.toJSON();
    return {
      ...json,
      amount: unwrapped.amount.toBigInt().toString(),
      deposit: unwrapped.deposit.toBigInt().toString(),
    };
  } else {
    return null;
  }
}

module.exports = {
  queryApproval,
};
