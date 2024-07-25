const { queryAllProxiesOf } = require("../../../common/query");
const { logger } = require("@osn/scan-common");
const {
  palletProxy: { upsertProxyIfNo, getProxyTimelineCol },
} = require("@statescan/mongo");
const { generateProxyId } = require("../../../common/hash");

async function handlePureCreated(event, indexer) {
  const pure = event.data[0].toString(); // delegator
  const delegatee = event.data[1].toString();
  const type = event.data[2].toString();
  const disambiguationIndex = event.data[3].toNumber();

  const { proxies } = await queryAllProxiesOf(pure, indexer.blockHash);
  if (proxies.length <= 0) {
    logger.error(
      `Can not find pure proxy from storage at ${indexer.blockHeight}`,
    );
    return;
  }

  const proxy = proxies[0];
  const { delay } = proxy;
  const proxyId = generateProxyId(pure, delegatee, type, delay);
  await upsertProxyIfNo({
    proxyId,
    delegator: pure,
    delegatee,
    type,
    delay,
    isRemoved: false,
    isPure: true,
    disambiguationIndex,
    indexer,
  });

  const timelineCol = await getProxyTimelineCol();
  await timelineCol.insertOne({
    proxyId,
    name: event.method,
    args: {
      pure,
      delegatee,
      type,
      delay,
      disambiguationIndex,
    },
    indexer,
  });
}

module.exports = {
  handlePureCreated,
};
