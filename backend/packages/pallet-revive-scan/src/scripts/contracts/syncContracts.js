const path = require("path");

// Read the .env of the package, so the script works from any directory.
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const {
  chain: { getApi },
  logger,
} = require("@osn/scan-common");
const {
  palletRevive: { getContractCol, initPalletReviveScanDb },
} = require("@statescan/mongo");
const { saveObservedContract } = require("../../scan/contracts");
const { resolveNetwork, checkNodeChain } = require("../networks");

// The state of a block this old is served by an archive node only.
const STATE_PROBE_DEPTH = 1000000;

// The chain of the node in WS_ENDPOINT decides what is in the state, a chain this package
// does not index is rejected here, before anything is read.
const network = resolveNetwork();

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

async function main() {
  console.log(`Reading the ${network.name} contract state`);

  const api = await getApi();
  checkNodeChain(api, network);
  const header = await api.rpc.chain.getHeader();
  const blockHeight = header.number.toNumber();
  const blockHash = (await api.rpc.chain.getBlockHash(blockHeight)).toHex();
  const blockTime = (await api.query.timestamp.now.at(blockHash)).toNumber();
  await ensureStateHistory(api, blockHeight);

  const contracts = await getStateContracts(api, blockHash);
  console.log(
    `${contracts.length} contracts in the state of block ${blockHeight}`,
  );

  await initPalletReviveScanDb();
  const col = await getContractCol();
  const knownContracts = await col
    .find({}, { projection: { _id: 0, address: 1 } })
    .toArray();
  const known = new Set(knownContracts.map(({ address }) => address));
  const missing = contracts.filter(({ address }) => !known.has(address));
  console.log(`${missing.length} contracts are not indexed`);

  const limit = parseInt(process.argv[2] || "0");
  const queue = limit > 0 ? missing.slice(0, limit) : missing;

  const block = {
    hash: { toHex: () => blockHash },
    header: {
      parentHash: { toHex: () => header.parentHash.toHex() },
      number: { toNumber: () => blockHeight },
    },
  };

  let added = 0;
  let skipped = 0;
  let failed = 0;
  const worker = async () => {
    while (queue.length > 0) {
      const { address, codeHash } = queue.shift();
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
      } catch (e) {
        failed++;
        logger.error(`Error in indexing contract ${address}`, e);
      }
    }
  };

  const concurrency = Math.max(
    1,
    parseInt(process.env.SYNC_CONCURRENCY || "4"),
  );
  await Promise.all(
    Array.from({ length: Math.min(concurrency, queue.length) }, worker),
  );

  console.log(`${added} contracts added, ${skipped} skipped, ${failed} failed`);
  process.exit(0);
}

main().catch((e) => {
  console.error(
    `Error in syncing the contracts of the chain state: ${e.message}`,
  );
  logger.error("Error in syncing the contracts of the chain state", e);
  process.exit(1);
});
