const {
  palletRecovery: { getRecoveryCol },
} = require("@statescan/mongo");

async function recovery(_, _args) {
  const { lostAccount, rescuerAccount, created } = _args;

  const col = await getRecoveryCol();
  return await col.findOne(
    { lostAccount, rescuerAccount, created },
    { projection: { _id: 0 } },
  );
}

module.exports = {
  recovery,
};
