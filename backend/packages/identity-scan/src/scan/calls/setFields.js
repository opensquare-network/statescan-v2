const { getRegistrar } = require("../common");
const { batchInsertRegistrars, insertRegistrarTimeline } = require("../mongo");
const { queryRegistrars } = require("../query");

async function handleSetFieldsCall(call, signer, extrinsicIndexer) {
  const { section, method } = call;
  if ("identity" !== section || "setFields" !== method) {
    return;
  }

  const rawRegistrars = await queryRegistrars(extrinsicIndexer);
  await batchInsertRegistrars(rawRegistrars.toJSON());

  const index = call.args[0].toNumber();
  const fields = call.args[1].toJSON();

  let registrar = signer;
  if (!signer) {
    registrar = getRegistrar(rawRegistrars, index, extrinsicIndexer);
  }

  if (registrar) {
    await insertRegistrarTimeline({
      account: registrar,
      indexer: extrinsicIndexer,
      name: method,
      args: {
        index,
        fields,
      },
    });
  }
}

module.exports = {
  handleSetFieldsCall,
};
