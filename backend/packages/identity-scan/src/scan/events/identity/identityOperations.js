const { getIdentityStorage } = require("../../utils/getIdentityStorage");
const {
  identity: { getIdentityCollection },
} = require("@statescan/mongo");

async function updateIdentity(identity) {
  const registrarsCollection = await getIdentityCollection();
  await registrarsCollection.updateOne(
    { _id: identity.accountId },
    { $set: identity },
    { upsert: true },
  );
}

async function setIdentity(event) {
  const accountId = event.data[0].toString();

  let identityInfo = await getIdentityStorage(accountId);
  console.log(`identityInfo: ${JSON.stringify(identityInfo)}`);

  await updateIdentity(identityInfo);
}

// delete identity
async function deleteIdentity(event) {
  const accountId = event.data[0].toString();
  const registrarsCollection = await getIdentityCollection();
  await registrarsCollection.deleteOne({ _id: accountId });
}

module.exports = {
  setIdentity,
  deleteIdentity,
};
