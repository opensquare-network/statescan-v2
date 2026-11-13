const path = require("path");

// Read the .env of the package, so the script works from any directory.
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const {
  chain: { getApi },
  logger,
} = require("@osn/scan-common");
const {
  palletRevive: { getContractCol },
} = require("@statescan/mongo");
const { saveObservedContract } = require("../../scan/contracts");
const { resolveNetwork, checkNodeChain } = require("../networks");

// The state of a block this old is served by an archive node only.
const STATE_PROBE_DEPTH = 1000000;

function elapsedSeconds(startedAt) {
  return `${((Date.now() - startedAt) / 1000).toFixed(1)}s`;
}

// The address is the first argument of the `revive.accountInfoOf(address)` storage key.
function getEntryAddress(key) {
  const address = key.args?.[0]?.toHex?.();
  return address ? address.toLowerCase() : null;
}

// Reads the whole map, which holds every account the pallet knows: the contracts and the
// externally owned accounts alike. It is a snapshot of a block, not a list of creations,
// so the creation block of a contract is located when it is added.
async function getStateContracts(api, blockHash) {
  const entries = await api.query.revive.accountInfoOf.entriesAt(blockHash);
  const contracts = [];

  for (const [key, info] of entries) {
    if (info.isEmpty) {
      continue;
    }

    const contract = info.toJSON?.()?.accountType?.contract;
    const address = getEntryAddress(key);
    if (contract?.codeHash && address) {
      contracts.push({ address, codeHash: contract.codeHash });
    }
  }

  return contracts;
}

// Locating the creation block of a contract reads the state of past blocks, which a
// pruned node does not keep for long.
async function ensureStateHistory(api, blockHeight) {
  const probeHeight = Math.max(1, blockHeight - STATE_PROBE_DEPTH);
  try {
    const blockHash = await api.rpc.chain.getBlockHash(probeHeight);
    await api.query.timestamp.now.at(blockHash.toHex());
  } catch (e) {
    throw new Error(
      `The node does not serve the state of block ${probeHeight}, an archive node is required: ${e?.message}`,
    );
  }
}

// The contracts of the chain state the database does not know yet. The scan finds a
// contract by the events of its deployment, so one which deploys without leaving a log is
// only visible here.
async function syncContracts({ limit = 0, api: givenApi = null } = {}) {
  // The chain of the node in WS_ENDPOINT decides what is in the state, a chain this
  // package does not index is rejected here, before anything is read.
  const network = resolveNetwork();
  const api = givenApi ?? (await getApi());
  checkNodeChain(api, network);
  console.log(`Reading the ${network.name} contract state`);
  const header = await api.rpc.chain.getHeader();
  const blockHeight = header.number.toNumber();
  const blockHash = (await api.rpc.chain.getBlockHash(blockHeight)).toHex();
  const blockTime = (await api.query.timestamp.now.at(blockHash)).toNumber();
  await ensureStateHistory(api, blockHeight);

  const contracts = await getStateContracts(api, blockHash);
  console.log(
    `${contracts.length} contracts in the state of block ${blockHeight}`,
  );

  const col = await getContractCol();
  const knownContracts = await col
    .find({}, { projection: { _id: 0, address: 1 } })
    .toArray();
  const known = new Set(knownContracts.map(({ address }) => address));
  const missing = contracts.filter(({ address }) => !known.has(address));
  console.log(`${missing.length} contracts are not indexed`);

  // The queue is shifted by the workers, a copy keeps the count of the missing ones.
  const missingCount = missing.length;
  const queue = limit > 0 ? missing.slice(0, limit) : [...missing];

  const block = {
    hash: { toHex: () => blockHash },
    header: {
      parentHash: { toHex: () => header.parentHash.toHex() },
      number: { toNumber: () => blockHeight },
    },
  };

  const concurrency = Math.max(
    1,
    parseInt(process.env.SYNC_CONCURRENCY || "4"),
  );
  const total = queue.length;
  if (total > 0) {
    // Locating the creation block reads the state of past blocks, a contract takes
    // seconds, so every contract is reported instead of a summary every batch.
    console.log(`Indexing ${total} contracts, ${concurrency} at a time`);
  }

  let added = 0;
  let skipped = 0;
  let failed = 0;
  let processed = 0;
  const worker = async () => {
    while (queue.length > 0) {
      const { address, codeHash } = queue.shift();
      const startedAt = Date.now();
      try {
        const saved = await saveObservedContract(col, api, block, {
          address,
          codeHash,
          deployer: null,
          indexer: {
            blockHeight,
            blockHash,
            blockTime,
            extrinsicIndex: null,
            eventIndex: null,
          },
        });
        if (saved) {
          added++;
        } else {
          skipped++;
        }
        processed++;
        console.log(
          `  ${processed}/${total} ${address} ` +
            `${saved ? "indexed" : "skipped"}, ${elapsedSeconds(startedAt)}, ` +
            `${added} added, ${skipped} skipped, ${failed} failed`,
        );
      } catch (e) {
        failed++;
        processed++;
        console.log(
          `  ${processed}/${total} ${address} ` +
            `failed, ${elapsedSeconds(startedAt)}, ` +
            `${added} added, ${skipped} skipped, ${failed} failed`,
        );
        logger.error(`Error in indexing contract ${address}`, e);
      }
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(concurrency, queue.length) }, worker),
  );

  return {
    network: network.name,
    blockHeight,
    contracts: contracts.length,
    missing: missingCount,
    added,
    skipped,
    failed,
  };
}

// node src/scripts/contracts/syncContracts.js [limit]
// The same function the scheduled job of the scan calls, see src/jobs.
async function main() {
  const result = await syncContracts({
    limit: parseInt(process.argv[2] || "0"),
  });
  console.log(
    `${result.added} contracts added, ${result.skipped} skipped, ${result.failed} failed`,
  );
  process.exit(0);
}

if (require.main === module) {
  main().catch((e) => {
    console.error(
      `Error in syncing the contracts of the chain state: ${e.message}`,
    );
    logger.error("Error in syncing the contracts of the chain state", e);
    process.exit(1);
  });
}

module.exports = {
  syncContracts,
};
