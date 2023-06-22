const { insertIdentityTimeline } = require("../../../mongo");
const { extractIdentityInfo } = require("../../../utils");
const { queryIdentityInfo } = require("../../../query");
const isEmpty = require("lodash.isempty");
const { REQUEST_STATUS } = require("../../../constants");
const { insertRequestTimeline } = require("../../../mongo");
const { getAllPendingRequest } = require("../../../mongo");
const { addBlockAccount } = require("../../../../store/account");

async function getIdentityInfo(account, indexer) {
  const rawIdentity = await queryIdentityInfo(account, indexer);
  if (!rawIdentity.isSome) {
    return {};
  }

  const info = extractIdentityInfo(rawIdentity);
  return Object.entries(info).reduce((result, [key, value]) => {
    if (isEmpty(key) || isEmpty(value)) {
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

  const pendingRequests = await getAllPendingRequest(account);
  for (const request of pendingRequests) {
    const { registrarIndex, requestHeight } = request;
    await insertRequestTimeline({
      account,
      registrarIndex,
      requestHeight,
      indexer,
      name: REQUEST_STATUS.REMOVED,
      args: {},
    });
  }
}

module.exports = {
  handleIdentitySet,
};
