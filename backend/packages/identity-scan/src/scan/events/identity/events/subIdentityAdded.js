const { addBlockAccount } = require("../../../../store");
const { insertIdentityTimeline } = require("../../../mongo");

async function handleSubIdentityAdded(event, indexer) {
  const sub = event.data[0].toString();
  const parent = event.data[1].toString();
  const deposit = event.data[2].toBigInt().toString();
  addBlockAccount(indexer.blockHash, sub);
  addBlockAccount(indexer.blockHash, parent);

  // add timeline for sub
  await insertIdentityTimeline({
    account: sub,
    indexer,
    name: event.method,
    args: {
      parent,
      deposit,
    },
  });

  // add timeline for parent
  await insertIdentityTimeline({
    account: parent,
    indexer,
    name: event.method,
    args: {
      sub,
      deposit,
    },
  });
}

module.exports = {
  handleSubIdentityAdded,
};
