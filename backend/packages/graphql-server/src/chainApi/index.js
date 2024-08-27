const { ApiPromise, WsProvider } = require("@polkadot/api");
const { getEndpoints } = require("../env");
const { statusLogger: logger } = require("../logger");

const nodeTimeoutSeconds = 20;
let apis = [];

function rejectInTime(seconds) {
  return new Promise((_, reject) => setTimeout(reject, seconds * 1000));
}

async function reConnect(endpoint) {
  const index = apis.findIndex(({ endpoint: url }) => url === endpoint);
  if (index >= 0) {
    const [targetApi] = apis.splice(index, 1);
    if (targetApi && targetApi.api) {
      await targetApi.api.disconnect();
    }
  }

  console.log(`re-connect with endpoint: ${endpoint}`);
  await createOneApi(endpoint);
  logger.info(`Reconnect to ${endpoint}`);
}

async function createOneApi(endpoint) {
  const provider = new WsProvider(endpoint, 100);

  let api;
  try {
    api = await ApiPromise.create({ provider });
  } catch (e) {
    logger.error(`Can not connect to ${endpoint}`);
    throw e;
  }

  api.on("error", () => {
    reConnect(endpoint, logger);
  });
  api.on("disconnected", () => {
    reConnect(endpoint, logger);
  });

  if (apis.findIndex((api) => api.endpoint === endpoint) >= 0) {
    logger.info(`${endpoint} existed, ignore`);
    return;
  }

  const nodeInfo = {
    endpoint,
    api: await api.isReady,
  };
  apis = [...apis, nodeInfo];
}

async function createApiInLimitTime(endpoint) {
  return Promise.race([
    createOneApi(endpoint),
    rejectInTime(nodeTimeoutSeconds),
  ]);
}

function getApis() {
  return (apis || []).map(({ api }) => api);
}

async function createApis() {
  const endpoints = getEndpoints();
  for (const endpoint of endpoints) {
    if (!endpoint) {
      continue;
    }

    try {
      await createApiInLimitTime(endpoint);
      console.log(`${endpoint} created!`);
    } catch (e) {
      logger.info(
        `Can not connected to ${endpoint} in ${nodeTimeoutSeconds} seconds, just disconnect it`,
      );
    }
  }
}

async function chainCall(fn) {
  const apis = getApis();
  return await Promise.any(apis.map((api) => fn(api)));
}

module.exports = {
  createApis,
  getApis,
  chainCall,
};
