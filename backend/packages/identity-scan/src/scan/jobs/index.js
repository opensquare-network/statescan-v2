const {
    identity: {
        getRegistrarsCollection
    }
} = require("@statescan/mongo");
const {
    chain: {getApi},
} = require("@osn/scan-common");
const {
    getIdentityStorage
} = require("../utils/getIdentityStorage");

async function bulkUpdateRegistrars(registrars) {
    const identityCollection = await getRegistrarsCollection();

    // Create an array of updateOne operations
    const operations = registrars.map((identity) => ({
        updateOne: {
            filter: {_id: identity.registrarIndex},
            update: {$set: identity},
            upsert: true
        }
    }));

    // Perform the batch update
    await identityCollection.bulkWrite(operations);
}


async function initRegistrars() {
    const api = await getApi();
    await getAllRegistrars(api);
}

async function getAllRegistrars(api) {
    const registrars = await api.query.identity.registrars();
    console.log(`total registrars`, registrars.length);

    let registrarsDB = [];
    for (const registrar of registrars) {
        let registrarInfo = {};
        let accountId = registrar.unwrap().account.toString();
        if (registrar.isSome) {
            registrarInfo = await getIdentityStorage(accountId);
        } else {
            registrarInfo.accountId = accountId;
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
};
