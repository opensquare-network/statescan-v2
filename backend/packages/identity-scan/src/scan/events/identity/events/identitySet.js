const { insertIdentityTimeline } = require("../../../mongo");
const { extractIdentityInfo } = require("../../../utils");
const { queryIdentityInfo } = require("../../../query");
const isEmpty = require("lodash.isempty");
const { addBlockAccount } = require("../../../../store/account");

async function getIdentityInfo(account, indexer) {
  const rawIdentity = await queryIdentityInfo(account, indexer);
  if (!rawIdentity.isSome) {
    return {};
  }

  const info = extractIdentityInfo(rawIdentity);
  return Object.entries(info).reduce((result, [key, value]) => {
    if (isEmpty(value)) {
      return result;
    }

    return {
      ...result,
      [key]: value,
    };
  }, {});
}

async function handleIdentitySet(event, indexer) {
  const account = event.data[0].toString();
  addBlockAccount(indexer.blockHash, account);

  await insertIdentityTimeline({
    account,
    indexer,
    name: event.method,
    args: await getIdentityInfo(account, indexer),
  });
}

module.exports = {
  handleIdentitySet,
};
