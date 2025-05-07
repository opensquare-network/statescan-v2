require("dotenv").config();
const {
  account: { initAccountScanDb, getAccountDb },
} = require("@statescan/mongo");
const { clearEmptyAccount } = require("./clear");
const {
  chain: { getApi, disconnect },
  utils: { bigAdd },
} = require("@osn/scan-common");
const { u8aToHex } = require("@polkadot/util");
const { toDecimal128 } = require("../../utils/toDecimal128");
const { bulkUpdateAccounts } = require("../../mongo/services/bulkUpdate");

const queryCount = 1000;

async function queryEntries(startKey, num = 1000) {
  const api = await getApi();

  return api.query.tokens.accounts.entriesPaged({
    args: [],
    pageSize: num,
    startKey,
  });
}

function normalizeAccountData(data) {
  const free = data.free.toString();
  const reserved = data.reserved.toString();
  const frozen = data.frozen.toString();
  const total = bigAdd(free, reserved);

  return {
    total: toDecimal128(total),
    free: toDecimal128(free),
    reserved: toDecimal128(reserved),
    miscFrozen: toDecimal128(frozen),
  };
}

function getAccountsWithBalanceData(entries = []) {
  const intrEntries = entries.filter((entry) => {
    const isToken = entry[0].args[1].isToken;
    if (isToken) {
      const token = entry[0].args[1].asToken;
      return token.isIntr;
    } else {
      return false;
    }
  });

  const nonZeroEntries = intrEntries.filter(([key, value]) => {
    const free = value.free.toString();
    const reserved = value.reserved.toString();
    return BigInt(free) + BigInt(reserved) > 0;
  });

  return nonZeroEntries.map(([key, value]) => {
    const address = key.args[0].toString();
    const data = normalizeAccountData(value);
    return {
      address,
      detail: {
        data,
      },
    };
  });
}

async function getAccountsWithSystemData(accounts = []) {
  const addrs = accounts.map((a) => a.address);
  const api = await getApi();
  const systemAccounts = await api.query.system.account.multi(addrs);

  const result = [];
  for (let i = 0; i < accounts.length; i++) {
    const { address, detail = {} } = accounts[i];
    const systemAccount = systemAccounts[i].toJSON();
    result.push({
      address,
      detail: {
        ...systemAccount,
        ...detail,
      },
    });
  }

  return result;
}

(async () => {
  await initAccountScanDb();
  await clearEmptyAccount();

  let total = 0;
  let startKey = null;
  let entries = await queryEntries(startKey, queryCount);

  while (entries.length > 0) {
    const accountsWithData = getAccountsWithBalanceData(entries);
    const normalizedAccounts = await getAccountsWithSystemData(
      accountsWithData,
    );
    await bulkUpdateAccounts(normalizedAccounts);

    total += normalizedAccounts.length;
    console.log(`total ${total} accounts saved!`);

    startKey = u8aToHex(entries[entries.length - 1][0]);
    entries = await queryEntries(startKey, queryCount);
  }

  console.log(`account updated, total ${total}`);
  await disconnect();
  const accountDb = getAccountDb();
  if (accountDb) {
    await accountDb.close();
  }
})();
