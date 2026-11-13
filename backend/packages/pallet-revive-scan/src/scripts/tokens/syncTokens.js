const path = require("path");

// Read the .env of the package, so the script works from any directory.
require("dotenv").config({ path: path.resolve(__dirname, "../../../.env") });

const {
  chain: { getApi },
  logger,
} = require("@osn/scan-common");
const {
  palletRevive: { getContractCol, getTokenCol, getVerifiedContractCol },
} = require("@statescan/mongo");
const { resolveNetwork, checkNodeChain } = require("../networks");
const { readTokenMetadata } = require("./erc20");
const { getErc20PrecompileAddress } = require("./precompiles");

const DEFAULT_CONCURRENCY = 4;
const PROGRESS_STEP = 50;

// node src/scripts/tokens/syncTokens.js [--network=<name>] [--all]
// [--limit=<n>] [--concurrency=<n>]
// The token list is built from two sources:
//
// - the contracts of the chain, a contract answering the EIP-20 getters with a value that
//   decodes is a token, see ./erc20.js,
// - the assets of the pallet-assets, they are exposed as ERC-20 precompiles at an address
//   derived from the asset id, see ./precompiles.js, and never reach the contract
//   collection because they are no deployed contracts.
//
// --network picks polkadot or kusama, the CHAIN of the .env decides when it is missing.
// --all reads every contract and every asset again, which refreshes the metadata of the
// known tokens, otherwise only the ones which are not tokens yet are read.
// --limit handles only the first <n> items of each queue, handy to try it out.
// --concurrency is the number of items read in parallel, SYNC_CONCURRENCY is the default.
function parseArgs(argv) {
  const network = argv.find((arg) => arg.startsWith("--network="));
  const limit = argv.find((arg) => arg.startsWith("--limit="));
  const concurrency = argv.find((arg) => arg.startsWith("--concurrency="));

  const args = {
    network: network ? network.slice("--network=".length) : null,
    all: argv.includes("--all"),
    limit: parseInt(limit ? limit.slice("--limit=".length) : 0),
    concurrency: parseInt(
      concurrency
        ? concurrency.slice("--concurrency=".length)
        : process.env.SYNC_CONCURRENCY || DEFAULT_CONCURRENCY,
    ),
  };

  if (!Number.isInteger(args.limit) || args.limit < 0) {
    throw new Error(
      `Invalid limit ${args.limit}, it must be a non-negative integer`,
    );
  }
  if (!Number.isInteger(args.concurrency) || args.concurrency <= 0) {
    throw new Error(
      `Invalid concurrency ${args.concurrency}, it must be a positive integer`,
    );
  }

  return args;
}

function createCounter(label) {
  return {
    label,
    total: 0,
    processed: 0,
    added: 0,
    refreshed: 0,
    skipped: 0,
    failed: 0,
  };
}

function logProgress(counter) {
  counter.processed++;
  if (counter.processed % PROGRESS_STEP !== 0) {
    return;
  }

  console.log(
    `  ${counter.label} ${counter.processed}/${counter.total}: ` +
      `${counter.added} added, ${counter.refreshed} refreshed, ` +
      `${counter.skipped} skipped, ${counter.failed} failed`,
  );
}

function summarize(counter) {
  console.log(
    `  ${counter.label}: ${counter.added} tokens added, ` +
      `${counter.refreshed} refreshed, ${counter.skipped} without the metadata ` +
      `interface, ${counter.failed} failed`,
  );
}

async function runQueue(queue, concurrency, handler) {
  const worker = async () => {
    while (queue.length > 0) {
      await handler(queue.shift());
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(concurrency, queue.length) }, worker),
  );
}

async function getAddressSet(col, filter = {}) {
  const docs = await col
    .find(filter, { projection: { _id: 0, address: 1 } })
    .toArray();
  return new Set(docs.map(({ address }) => address));
}

// The contracts of the chain, the ones which are already tokens are left out unless every
// contract is read again.
async function getContractCandidates(contractCol, tokenCol, all, limit) {
  const contracts = await contractCol
    .find(
      {},
      {
        projection: {
          _id: 0,
          address: 1,
          codeHash: 1,
          deployer: 1,
          indexer: 1,
        },
      },
    )
    .toArray();

  let candidates = contracts;
  if (!all) {
    const knownTokens = await getAddressSet(tokenCol, {
      precompile: { $ne: true },
    });
    candidates = contracts.filter(({ address }) => !knownTokens.has(address));
  }

  return limit > 0 ? candidates.slice(0, limit) : candidates;
}

// The assets of the pallet-assets, each one is a token through its ERC-20 precompile.
async function getAssetCandidates(api, tokenCol, all, limit) {
  if (typeof api.query.assets?.asset?.entries !== "function") {
    console.warn(
      "The chain holds no pallet-assets, the erc20 precompiles are skipped",
    );
    return [];
  }

  const entries = await api.query.assets.asset.entries();
  let candidates = entries.map(([key]) => {
    const assetId = key.args[0].toNumber();
    return { assetId, address: getErc20PrecompileAddress(assetId) };
  });

  if (!all) {
    const knownTokens = await getAddressSet(tokenCol, { precompile: true });
    candidates = candidates.filter(({ address }) => !knownTokens.has(address));
  }

  return limit > 0 ? candidates.slice(0, limit) : candidates;
}

function toContractTokenDoc(contract, metadata, { readAt, verified }) {
  return {
    address: contract.address,
    ...metadata,
    standard: "ERC20",
    verified: verified.has(contract.address),
    deployer: contract.deployer ?? null,
    codeHash: contract.codeHash ?? null,
    indexer: contract.indexer ?? null,
    readAt,
    updatedAt: new Date(),
  };
}

function toPrecompileTokenDoc(asset, metadata, readAt) {
  return {
    address: asset.address,
    ...metadata,
    standard: "ERC20",
    precompile: true,
    assetId: asset.assetId,
    verified: false,
    deployer: null,
    codeHash: null,
    indexer: null,
    readAt,
    updatedAt: new Date(),
  };
}

async function saveToken(tokenCol, counter, doc) {
  const result = await tokenCol.updateOne(
    { address: doc.address },
    { $set: doc },
    { upsert: true },
  );
  if (result.upsertedCount > 0) {
    counter.added++;
  } else {
    counter.refreshed++;
  }
}

async function syncTokenQueue(
  api,
  { label, queue, concurrency, tokenCol, toDoc },
) {
  const counter = createCounter(label);
  counter.total = queue.length;

  await runQueue(queue, concurrency, async (item) => {
    try {
      const metadata = await readTokenMetadata(api, item.address);
      if (!metadata) {
        counter.skipped++;
      } else {
        await saveToken(tokenCol, counter, toDoc(item, metadata));
      }
    } catch (e) {
      counter.failed++;
      logger.error(`Error in reading the token metadata of ${item.address}`, e);
    }

    logProgress(counter);
  });

  return counter;
}

async function readBlockIndexer(api, header) {
  let blockTime = null;
  try {
    blockTime = (await api.query.timestamp.now.at(header.hash)).toNumber();
  } catch (e) {
    logger.warn(
      `Error in reading the time of block ${header.number}: ${e?.message}`,
    );
  }

  return { blockHeight: header.number.toNumber(), blockTime };
}

// The token list of the chain: the deployed contracts answering the EIP-20 getters and
// the precompiles of the pallet-assets. `all` reads the known tokens again, otherwise only
// the contracts and assets which are not in the list yet are read.
async function syncTokens({
  network: networkArg = null,
  all = false,
  limit = 0,
  concurrency = null,
  api: givenApi = null,
} = {}) {
  const network = resolveNetwork(networkArg);
  const parallel =
    concurrency ??
    parseInt(process.env.SYNC_CONCURRENCY || DEFAULT_CONCURRENCY, 10);
  const api = givenApi ?? (await getApi());
  checkNodeChain(api, network);
  if (typeof api.call.reviveApi?.call !== "function") {
    throw new Error(
      `The ${network.name} node does not expose the revive runtime api`,
    );
  }

  const contractCol = await getContractCol();
  const tokenCol = await getTokenCol();
  const contractQueue = await getContractCandidates(
    contractCol,
    tokenCol,
    all,
    limit,
  );
  const assetQueue = await getAssetCandidates(api, tokenCol, all, limit);
  const verified = await getAddressSet(await getVerifiedContractCol());
  const readAt = await readBlockIndexer(api, await api.rpc.chain.getHeader());

  console.log(
    `Reading the ${network.name} token metadata at block ${readAt.blockHeight}, ` +
      `${parallel} at a time: ` +
      `${contractQueue.length} contracts, ${assetQueue.length} assets`,
  );

  const contracts = await syncTokenQueue(api, {
    label: "contracts",
    queue: contractQueue,
    concurrency: parallel,
    tokenCol,
    toDoc: (contract, metadata) =>
      toContractTokenDoc(contract, metadata, { readAt, verified }),
  });

  const precompiles = await syncTokenQueue(api, {
    label: "precompiles",
    queue: assetQueue,
    concurrency: parallel,
    tokenCol,
    toDoc: (asset, metadata) => toPrecompileTokenDoc(asset, metadata, readAt),
  });

  return {
    readAt,
    contracts,
    precompiles,
    added: contracts.added + precompiles.added,
    refreshed: contracts.refreshed + precompiles.refreshed,
  };
}

// node src/scripts/tokens/syncTokens.js [--network=<name>] [--all] [--limit=<n>]
// [--concurrency=<n>]
// The same function the rebuild calls when it ends, see ../rebuild/index.js.
async function main() {
  const result = await syncTokens(parseArgs(process.argv.slice(2)));

  console.log("");
  summarize(result.contracts);
  summarize(result.precompiles);
  console.log(`${result.added} tokens added, ${result.refreshed} refreshed`);
  process.exit(0);
}

if (require.main === module) {
  main().catch((e) => {
    console.error(`Error in syncing the tokens of the chain: ${e.message}`);
    logger.error("Error in syncing the tokens of the chain", e);
    process.exit(1);
  });
}

module.exports = {
  syncTokens,
};
