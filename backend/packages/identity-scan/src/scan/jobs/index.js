const {
  identity: { getRegistrarsCol },
} = require("@statescan/mongo");
const {
  chain: { getApi },
} = require("@osn/scan-common");
const { getIdentityStorage } = require("../utils/getIdentityStorage");

async function bulkUpdateRegistrars(registrars) {
  const identityCollection = await getRegistrarsCol();

  const operations = registrars.map((identity) => ({
    updateOne: {
      filter: { _id: identity.registrarIndex },
      update: { $set: identity },
      upsert: true,
    },
  }));

  await identityCollection.bulkWrite(operations);
}

async function initRegistrars() {
  const api = await getApi();
  await saveAllRegistrars(api);
}
async function saveAllRegistrars(api) {
  const registrars = await api.query.identity.registrars();

  let registrarsDB = [];
  for (const registrar of registrars) {
    let accountId = registrar.unwrap().account.toString();
    let registrarInfo = {};
    if (registrar.isSome) {
      registrarInfo = await getIdentityStorage(accountId);
    }
    registrarInfo.registrarIndex = registrars.indexOf(registrar);
    registrarsDB.push(registrarInfo);
  }
  await bulkUpdateRegistrars(registrarsDB);
}

async function startJobs() {
  try {
    await initRegistrars();
  } finally {
    setTimeout(startJobs, 60000);
  }
}

module.exports = {
  startJobs,
  saveAllRegistrars,
};
