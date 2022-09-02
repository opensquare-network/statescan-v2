require("dotenv").config();

const { closeDb } = require("../../mongo");
const { bulkUpdateAccounts } = require("../../mongo/services/bulkUpdate");
const { normalizeEntry } = require("./nomalize");
const { queryEntries } = require("./entries");
const { u8aToHex } = require("@polkadot/util");
const {
  chain: { getApi, disconnect },
  logger,
} = require("@osn/scan-common");

const queryCount = 1000;

async function main() {
  let total = 0;
  let startKey = null;
  let entries = await queryEntries(startKey, queryCount);

  const api = await getApi();
  const ss58Format = api.registry.chainSS58;

  while (entries.length > 0) {
    const normalizedAccounts = entries.map(entry => normalizeEntry(entry, ss58Format));
    await bulkUpdateAccounts(normalizedAccounts);
    logger.info(`${entries.length} accounts saved!`);

    total += normalizedAccounts.length;

    startKey = u8aToHex(entries[entries.length - 1][0]);
    entries = await queryEntries(startKey, queryCount);
  }

  logger.info(`account updated, total ${total}`);
  await disconnect();
  await closeDb();
}

main()
  .then(() => console.log("Scan finished"))
  .catch(console.error);
