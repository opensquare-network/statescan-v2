const { batchInsertRegistrars } = require("../../../mongo");
const { queryRegistrars } = require("../../../query");

async function handleRegistrarAdded(event, indexer) {
  const rawRegistrars = await queryRegistrars(indexer);
  await batchInsertRegistrars(rawRegistrars.toJSON());
}

module.exports = {
  handleRegistrarAdded,
};
