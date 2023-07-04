const {
  identity: { getRegistrarsCol, getIdentityCol },
} = require("@statescan/mongo");

async function registrars() {
  const col = await getRegistrarsCol();
  const registrars = await col
    .find({}, { projection: { _id: 0, fields: 0 } })
    .toArray();
  const accounts = registrars.map((i) => i.account);
  if (accounts.length <= 0) {
    return registrars;
  }

  const identityCol = await getIdentityCol();
  const identities = await identityCol
    .find({ account: { $in: accounts } }, { projection: { _id: 0 } })
    .toArray();
  return registrars.map((registrar, index) => {
    const { account } = registrar;
    return {
      index,
      ...registrar,
      identity: identities.find((identity) => identity.account === account),
    };
  });
}

module.exports = {
  registrars,
};
