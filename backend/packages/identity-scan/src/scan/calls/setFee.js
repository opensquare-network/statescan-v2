const { batchInsertRegistrars } = require("../mongo");
const { queryRegistrars } = require("../query");

async function handleSetFeeCall(call, signer, extrinsicIndexer) {
  const { section, method } = call;
  if ("identity" !== section || "setFee" !== method) {
    return;
  }

  const rawRegistrars = await queryRegistrars(extrinsicIndexer);
  await batchInsertRegistrars(rawRegistrars.toJSON());
}

module.exports = {
  handleSetFeeCall,
};
