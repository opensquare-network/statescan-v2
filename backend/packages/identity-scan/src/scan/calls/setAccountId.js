const { batchInsertRegistrars } = require("../mongo");
const { queryRegistrars } = require("../query");

async function handleSetAccountIdCall(call, signer, extrinsicIndexer) {
  const { section, method } = call;
  if ("identity" !== section || "setAccountId" !== method) {
    return;
  }

  const rawRegistrars = await queryRegistrars(extrinsicIndexer);
  await batchInsertRegistrars(rawRegistrars.toJSON());
}

module.exports = {
  handleSetAccountIdCall,
};
