const {
  chain: { findBlockApi },
} = require("@osn/scan-common");
const {
  foreignAsset: { getHolderCol },
} = require("@statescan/mongo");
const { getForeignAssetsSection } = require("../../consts/section");
const { bigGt } = require("@statescan/common/src/utils/bigInt");

async function queryAndSaveAllHolders(hash, location, indexer) {
  const blockApi = await findBlockApi(indexer.blockHash);
  const section = getForeignAssetsSection();
  const entries = await blockApi.query[section].account.entries(location);
  const holders = entries.map(([storageKey, option]) => {
    const address = storageKey.args[1].toString();
    const unwrapped = option.unwrap();
    const json = unwrapped.toJSON();
    return {
      address,
      info: {
        ...json,
        balance: unwrapped.balance.toBigInt().toString(),
      },
    };
  });
  const filtered = holders.filter((holder) => bigGt(holder.info.balance, 0));
  if (filtered.length <= 0) {
    return;
  }

  const col = await getHolderCol();
  const bulk = col.initializeUnorderedBulkOp();
  for (const holder of filtered) {
    bulk.insert({ assetId: hash, ...holder });
  }
  await bulk.execute();
}

module.exports = {
  queryAndSaveAllHolders,
};
