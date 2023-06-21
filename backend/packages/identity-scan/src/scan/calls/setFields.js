const { batchInsertRegistrars } = require("../mongo");
const { queryRegistrars } = require("../query");

async function handleSetFieldsCall(call, signer, extrinsicIndexer) {
  const { section, method } = call;
  if ("identity" !== section || "setFields" !== method) {
    return;
  }

  const rawRegistrars = await queryRegistrars(extrinsicIndexer);
  await batchInsertRegistrars(rawRegistrars.toJSON());
}

module.exports = {
  handleSetFieldsCall,
};
