const {
    identity: {
        getRegistrarsCollection
    }, getIdentityCol,
} = require("@statescan/mongo");
const {
    chain: {getApi},
} = require("@osn/scan-common");
const {
    getidentityStorage
} = require("../utils/getidentityStorage");

//TODO: optimize this function by using bulk write
async function updateRegistrars(registrar) {
    const registrarsCollection = await getRegistrarsCollection();
    await registrarsCollection.updateOne({accountId: registrar.accountId}, {$set: registrar}, {upsert: true});
}

async function bulkUpdateRegistrars(registrars) {
    const identityCollection = await getRegistrarsCollection();

    // Create an array of updateOne operations
    const operations = registrars.map((identity) => ({
        updateOne: {
            filter: {index: identity.accountId},
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
            registrarInfo = await getidentityStorage(accountId);
        } else {
            registrarInfo.accountId = accountId;
            registrarInfo.updatedAt = new Date();
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
