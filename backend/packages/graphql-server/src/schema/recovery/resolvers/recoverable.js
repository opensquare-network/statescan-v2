const {
  palletRecovery: { getRecoverableCol },
} = require("@statescan/mongo");

async function recoverable(_, _args) {
  const { height, lostAccount } = _args;

  const col = await getRecoverableCol();
  return await col.findOne(
    { height, who: lostAccount },
    { projection: { _id: 0 } },
  );
}

module.exports = {
  recoverable,
};
