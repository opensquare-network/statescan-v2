const { getRegistrar } = require("../../../common");
const {
  batchInsertRegistrars,
  insertRegistrarTimeline,
} = require("../../../mongo");
const { queryRegistrars } = require("../../../query");

async function handleRegistrarAdded(event, indexer) {
  const rawRegistrars = await queryRegistrars(indexer);
  await batchInsertRegistrars(rawRegistrars.toJSON());

  const registrarIndex = event.data[0].toNumber();
  const registrar = getRegistrar(rawRegistrars, registrarIndex, indexer);

  if (registrar) {
    await insertRegistrarTimeline({
      account: registrar,
      indexer,
      name: event.method,
      args: {
        index: registrarIndex,
        registrar,
      },
    });
  }
}

module.exports = {
  handleRegistrarAdded,
};
