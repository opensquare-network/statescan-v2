require("dotenv").config();

const { bulkUpdateAccounts } = require("../../mongo/services/bulkUpdate");
const { normalizeEntry } = require("./nomalize");
const { queryEntries } = require("./entries");
const { u8aToHex } = require("@polkadot/util");
const {
  chain: { getApi, disconnect },
  env: { currentChain },
} = require("@osn/scan-common");
const {
  account: { initAccountScanDb, getAccountDb },
} = require("@statescan/mongo");

const queryCount = 1000;

async function main() {
  await initAccountScanDb();
  console.log(`Begin to update ${currentChain()} accounts`);

  let total = 0;
  let startKey = null;
  let entries = await queryEntries(startKey, queryCount);

  const api = await getApi();
  const ss58Format = api.registry.chainSS58;

  while (entries.length > 0) {
    const normalizedAccounts = entries.map((entry) =>
      normalizeEntry(entry, ss58Format),
    );
    await bulkUpdateAccounts(normalizedAccounts);
    console.log(`${entries.length} accounts saved!`);

    total += normalizedAccounts.length;

    startKey = u8aToHex(entries[entries.length - 1][0]);
    entries = await queryEntries(startKey, queryCount);
  }

  console.log(`account updated, total ${total}`);

  // todo: delete accounts whose balance is 0.

  await disconnect();
  const accountDb = getAccountDb();
  if (accountDb) {
    await accountDb.close();
  }
}

main()
  .then(() => console.log("Scan finished"))
  .catch(console.error);
