const {
  identity: { getRegistrarsCol, getIdentityCol, getRegistrarStatCol },
} = require("@statescan/mongo");

const emptyStat = {
  request: 0,
  given: 0,
  totalFee: "0",
};

function normalizeStat(stat) {
  if (!stat) {
    return emptyStat;
  }

  return {
    request: stat.request ? parseInt(stat.request) : 0,
    given: stat.given ? parseInt(stat.given) : 0,
    totalFee: stat.fee || "0",
  };
}

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

  const statCol = await getRegistrarStatCol();
  const stats = await statCol.find({}, { projection: { _id: 0 } }).toArray();

  return registrars.map((registrar) => {
    const { account, index } = registrar;
    const stat = stats.find((stat) => stat.index === index);

    return {
      ...registrar,
      identity: identities.find((identity) => identity.account === account),
      statistics: normalizeStat(stat),
    };
  });
}

module.exports = {
  registrars,
};
