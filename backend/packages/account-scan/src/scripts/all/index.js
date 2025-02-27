require("dotenv").config();

const { clearEmptyAccount } = require("./clear");
const { bulkUpdateAccounts } = require("../../mongo/services/bulkUpdate");
const { normalizeEntry } = require("./nomalize");
const { queryEntries } = require("./entries");
const { u8aToHex } = require("@polkadot/util");
const {
  chain: { disconnect },
  env: { currentChain },
} = require("@osn/scan-common");
const {
  account: { initAccountScanDb, getAccountDb },
} = require("@statescan/mongo");

const queryCount = 1000;

async function main() {
  await initAccountScanDb();
  console.log(`Begin to update ${currentChain()} accounts`);

  await clearEmptyAccount();

  let total = 0;
  let startKey = null;
  let entries = await queryEntries(startKey, queryCount);

  while (entries.length > 0) {
    const normalizedAccounts = entries.map((entry) => normalizeEntry(entry));
    await bulkUpdateAccounts(normalizedAccounts);

    total += normalizedAccounts.length;
    console.log(`total ${total} accounts saved!`);

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
