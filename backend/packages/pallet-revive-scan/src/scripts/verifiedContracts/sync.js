const {
  palletRevive: { getReviveDb, getVerifiedContractCol },
} = require("@statescan/mongo");
const { config } = require("./config");
const {
  iterateVerifiedContractPages,
  fetchContractDetail,
} = require("./blockscout");
const {
  mapContractListItem,
  mapContractDetail,
  sameVerifiedAt,
} = require("./mapper");
const { acquireLock, startHeartbeat, releaseLock } = require("./lock");

function log(...args) {
  console.log(new Date().toISOString(), ...args);
}

async function mapWithConcurrency(items, concurrency, fn) {
  const results = new Array(items.length);
  let next = 0;

  const workers = Array.from(
    { length: Math.min(concurrency, items.length) },
    async () => {
      let index = next++;
      while (index < items.length) {
        results[index] = await fn(items[index], index);
        index = next++;
      }
    },
  );
  await Promise.all(workers);

  return results;
}

function upsertOperation(doc, now) {
  return {
    updateOne: {
      filter: { address: doc.address },
      update: {
        $set: { ...doc, lastSeenAt: now },
        $setOnInsert: { firstSyncedAt: now },
      },
      upsert: true,
    },
  };
}

async function flushOperations(col, operations) {
  if (operations.length <= 0) {
    return 0;
  }

  await col.bulkWrite(operations, { ordered: false });
  return operations.length;
}

async function loadExisting(col, addresses) {
  if (addresses.length <= 0) {
    return new Map();
  }

  const docs = await col
    .find(
      { address: { $in: addresses } },
      {
        projection: {
          address: 1,
          compilerVersion: 1,
          verifiedAt: 1,
          sourceCode: 1,
          abi: 1,
        },
      },
    )
    .toArray();

  return new Map(docs.map((doc) => [doc.address, doc]));
}

// The verified contracts of the Blockscout instance of the network, the source code and
// the ABI the contract pages read. Returns the number of contracts which could not be
// fetched. The run holds the lock of ./lock.js, a run killed without releasing it is taken
// over when the ttl expires.
async function syncVerifiedContracts() {
  const db = await getReviveDb();
  const owner = `${process.pid}-${Date.now()}`;
  const lock = await acquireLock(db, config.lockTtlMs, owner);

  if (!lock.acquired) {
    log("Another verified contract sync is running, skip this run");
    return 0;
  }

  const heartbeat = startHeartbeat(lock.col, config.lockTtlMs, owner);

  const startedAt = Date.now();
  let listed = 0;
  let fetched = 0;
  let skipped = 0;
  let written = 0;
  let failed = 0;
  const failures = [];
  const seenAddresses = new Set();

  try {
    const col = await getVerifiedContractCol();
    await col.createIndex({ address: 1 }, { unique: true });

    log(
      `Syncing the ${config.network.name} verified contracts from ${config.apiHost}`,
    );
    let pending = [];

    for await (const { page, items, hasNext } of iterateVerifiedContractPages(
      config,
    )) {
      const listItems = items.map(mapContractListItem).filter((item) => {
        if (!item || !item.isVerified || seenAddresses.has(item.address)) {
          return false;
        }

        seenAddresses.add(item.address);
        return true;
      });
      listed += listItems.length;

      const existing = await loadExisting(
        col,
        listItems.map((item) => item.address),
      );

      const toFetch = [];
      const now = new Date();
      let pageSkipped = 0;

      for (const item of listItems) {
        const old = existing.get(item.address);
        const unchanged =
          old &&
          old.sourceCode != null &&
          old.abi != null &&
          old.compilerVersion === item.compilerVersion &&
          sameVerifiedAt(old.verifiedAt, item.verifiedAt);

        if (unchanged) {
          skipped++;
          pageSkipped++;
          pending.push({
            updateOne: {
              filter: { address: item.address },
              update: { $set: { lastSeenAt: now } },
            },
          });
        } else {
          toFetch.push(item);
        }
      }

      const details = await mapWithConcurrency(
        toFetch,
        config.detailConcurrency,
        async (item) => {
          try {
            const detail = await fetchContractDetail(config, item.address);
            return { doc: mapContractDetail(detail, item.address) };
          } catch (error) {
            return { address: item.address, error };
          }
        },
      );

      let pageFetched = 0;
      let pageFailed = 0;
      for (const result of details) {
        if (result.doc) {
          fetched++;
          pageFetched++;
          pending.push(upsertOperation(result.doc, now));
        } else {
          failed++;
          pageFailed++;
          failures.push({
            address: result.address,
            message: result.error.message,
          });
        }
      }

      while (pending.length >= config.upsertBatchSize) {
        written += await flushOperations(
          col,
          pending.splice(0, config.upsertBatchSize),
        );
      }

      log(
        `page ${page}: listed ${listItems.length}, fetched ${pageFetched}, ` +
          `skipped ${pageSkipped}, failed ${pageFailed}${
            hasNext ? "" : ", last page"
          }`,
      );
    }

    written += await flushOperations(col, pending);

    for (const failure of failures.slice(0, 20)) {
      console.error(`  ${failure.address}: ${failure.message}`);
    }
    if (failures.length > 20) {
      console.error(`  ...and ${failures.length - 20} more failures`);
    }

    const seconds = ((Date.now() - startedAt) / 1000).toFixed(1);
    log(
      `finished in ${seconds}s: listed ${listed}, fetched ${fetched}, ` +
        `skipped ${skipped}, written ${written}, failed ${failed}`,
    );

    return failed;
  } finally {
    clearInterval(heartbeat);
    await releaseLock(lock.col, owner);
  }
}

// node src/scripts/verifiedContracts/sync.js
// The same function the scheduled job of the scan calls, see src/jobs.
async function main() {
  const failed = await syncVerifiedContracts();
  await (await getReviveDb()).close();
  process.exitCode = failed > 0 ? 1 : 0;
}

if (require.main === module) {
  main().catch((error) => {
    console.error(
      new Date().toISOString(),
      "Verified contract sync failed",
      error,
    );
    process.exitCode = 1;
  });
}

module.exports = {
  syncVerifiedContracts,
};
