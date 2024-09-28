const { getPeopleChainApi } = require("./api");

let latestFinalizedHeight = null;

async function subscribePeopleChainHeight() {
  const api = await getPeopleChainApi();

  await new Promise((resolve) => {
    api.rpc.chain.subscribeFinalizedHeads((header) => {
      latestFinalizedHeight = header.number.toNumber();
      resolve();
    });
  });
}

function getPeopleLatestHeight() {
  return latestFinalizedHeight;
}

module.exports = {
  subscribePeopleChainHeight,
  getPeopleLatestHeight,
};
