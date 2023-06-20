const { queryRegistrars } = require("../../../query");
const { insertIdentityTimeline } = require("../../../mongo");
const { addBlockAccount } = require("../../../../store/account");

async function handleJudgementRequested(event, indexer) {
  const account = event.data[0].toString();
  addBlockAccount(indexer.blockHash, account);

  const registrarIndex = event.data[1].toNumber();
  const registrar = {
    index: registrarIndex,
  };
  const rawRegistrars = await queryRegistrars(indexer);
  if (
    rawRegistrars &&
    rawRegistrars[registrarIndex] &&
    rawRegistrars[registrarIndex].isSome
  ) {
    registrar[account] = rawRegistrars[registrarIndex]
      .unwrap()
      .account.toString();
  }

  await insertIdentityTimeline({
    account,
    indexer,
    name: event.method,
    args: { registrar },
  });

  // todo: save judgement requests for one registrar
}

module.exports = {
  handleJudgementRequested,
};
