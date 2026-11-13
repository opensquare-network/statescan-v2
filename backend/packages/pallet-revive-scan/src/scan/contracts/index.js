const {
  chain: { findBlockApi, getExtrinsicSigner },
  logger,
} = require("@osn/scan-common");
const {
  palletRevive: { getContractCol },
} = require("@statescan/mongo");
const { normalizeAddress } = require("../common/call");
const { parseEthereumTransaction } = require("../common/ethereum");
const { getReviveSection } = require("../common/section");
const { getPristineCode, getCodeLen } = require("./code");
const { saveReviveToken } = require("./token");

function isReviveEvent(event, method) {
  return event?.section === getReviveSection() && event?.method === method;
}

function isEthTransact(extrinsic) {
  return (
    extrinsic?.method.section === getReviveSection() &&
    extrinsic.method.method === "ethTransact"
  );
}

function getEmittedContract(event) {
  const data = event.data;
  const contract = data?.contract ?? data?.[0];
  return normalizeAddress(contract?.toHex?.() ?? contract);
}

// The deployer of a contract deployed through an ethTransact extrinsic is the sender of
// the ethereum transaction, it is recovered from the signature as the extrinsic itself is
// unsigned.
function getEthTransactSender(extrinsic) {
  const payload = extrinsic.method.args[0]?.toU8a(true);
  if (!payload || payload.length <= 0) {
    return null;
  }

  try {
    return parseEthereumTransaction(payload).sender;
  } catch (e) {
    return null;
  }
}

function getDeployer(extrinsic) {
  if (!extrinsic) {
    return null;
  }

  if (isEthTransact(extrinsic)) {
    return getEthTransactSender(extrinsic);
  }

  const isGeneral =
    typeof extrinsic.isGeneral === "function" && extrinsic.isGeneral();
  if (!isGeneral && !extrinsic.isSigned) {
    return null;
  }

  return getExtrinsicSigner(extrinsic) || null;
}

// A contract deployed by another contract, e.g. a factory calling CREATE, emits none of
// the `Instantiated` events the pallet emits for a top level instantiation, so the only
// trace it leaves in the block is the logs it emits while its constructor runs. Every
// address which emitted an event is therefore a deployment candidate, the state decides
// whether it is a contract which did not exist in the parent block.
function collectCandidates(events = [], extrinsics = [], blockIndexer) {
  const candidates = new Map();

  for (let eventIndex = 0; eventIndex < events.length; eventIndex++) {
    const { event, phase } = events[eventIndex];
    if (!isReviveEvent(event, "ContractEmitted")) {
      continue;
    }

    const address = getEmittedContract(event);
    // The first appearance in the block is the earliest one, the events are in the
    // execution order.
    if (!address || candidates.has(address)) {
      continue;
    }

    const extrinsicIndex =
      phase?.isApplyExtrinsic && phase.asApplyExtrinsic
        ? phase.asApplyExtrinsic.toNumber()
        : null;
    const extrinsic =
      extrinsicIndex === null ? null : extrinsics[extrinsicIndex];

    candidates.set(address, {
      address,
      indexer: { ...blockIndexer, extrinsicIndex, eventIndex },
      deployer: getDeployer(extrinsic),
    });
  }

  return candidates;
}

async function getContractInfo(api, address, blockHash) {
  const accountInfo = blockHash
    ? await api.query.revive.accountInfoOf.at(blockHash, address)
    : await api.query.revive.accountInfoOf(address);

  if (!accountInfo || accountInfo.isEmpty) {
    return null;
  }

  const info = accountInfo.toJSON?.() ?? null;
  return info?.accountType?.contract ?? null;
}

async function getContractInfoAtHeight(api, address, blockHeight) {
  const blockHash = await api.rpc.chain.getBlockHash(blockHeight);
  if (!blockHash || blockHash.isEmpty) {
    return null;
  }

  return getContractInfo(api, address, blockHash.toHex());
}

// The account info of a contract is written when the contract is created, so the first
// block holding it is the creation block. Reading the state of a past block requires an
// archive node, which is not always available.
async function findCreationHeight(api, address, upperBound) {
  try {
    let low = 0;
    let high = upperBound;

    while (high - low > 1) {
      const middle = Math.floor((low + high) / 2);
      const info = await getContractInfoAtHeight(api, address, middle);
      if (info) {
        high = middle;
      } else {
        low = middle;
      }
    }

    // A node which does not serve the state of a past block answers with an empty value
    // instead of failing, the search then ends on the wrong block, so the result is
    // always confirmed against its neighbours.
    const atHeight = await getContractInfoAtHeight(api, address, high);
    const beforeHeight =
      high > 0 ? await getContractInfoAtHeight(api, address, high - 1) : null;
    if (!atHeight || beforeHeight) {
      throw new Error(`creation block ${high} is not confirmed by the state`);
    }

    return high;
  } catch (e) {
    logger.warn(
      `Error in locating the creation block of contract ${address}, it is skipped: ${e?.message}`,
    );
    return null;
  }
}

async function getBlockTime(api, blockHeight) {
  const blockHash = await api.rpc.chain.getBlockHash(blockHeight);
  const now = await api.query.timestamp.now.at(blockHash.toHex());
  return now.toNumber();
}

async function saveObservedContract(col, api, block, candidate) {
  // The account info of a candidate read by the caller saves a lookup per address, the
  // ones which are not contract accounts, e.g. precompiles, are skipped either way.
  let codeHash = candidate.codeHash ?? null;
  if (!codeHash) {
    const info = await getContractInfo(
      api,
      candidate.address,
      block.hash.toHex(),
    );
    if (!info) {
      return false;
    }

    codeHash = info.codeHash;
  }

  let { indexer, deployer } = candidate;

  if (
    await getContractInfo(
      api,
      candidate.address,
      block.header.parentHash.toHex(),
    )
  ) {
    // The contract existed before this block, which means it was missed when its
    // creation block was scanned, so the deployer is unknown.
    deployer = null;

    const blockHeight = await findCreationHeight(
      api,
      candidate.address,
      block.header.number.toNumber(),
    );
    // Without the creation block the contract would be indexed at a block it was not
    // created in, which is worse than leaving it out.
    if (blockHeight === null) {
      return false;
    }

    indexer = { blockHeight, blockTime: await getBlockTime(api, blockHeight) };
  }

  const code = await getPristineCode(api, codeHash);
  await col.updateOne(
    { address: candidate.address },
    {
      $setOnInsert: {
        address: candidate.address,
        deployer,
        codeHash,
        code,
        codeLen: getCodeLen(code),
        indexer,
      },
    },
    { upsert: true },
  );

  return true;
}

async function handleReviveContracts({ block, events, blockIndexer }) {
  const candidates = collectCandidates(events, block.extrinsics, blockIndexer);
  if (candidates.size <= 0) {
    return;
  }

  const col = await getContractCol();
  const addresses = [...candidates.keys()];
  const knownContracts = await col
    .find(
      { address: { $in: addresses } },
      { projection: { _id: 0, address: 1 } },
    )
    .toArray();
  const known = new Set(knownContracts.map(({ address }) => address));
  const unknown = addresses.filter((address) => !known.has(address));
  if (unknown.length <= 0) {
    return;
  }

  const blockApi = await findBlockApi(blockIndexer.blockHash);
  for (const address of unknown) {
    try {
      const saved = await saveObservedContract(
        col,
        blockApi,
        block,
        candidates.get(address),
      );
      // Only a contract the scan just indexed is read, the ones already in the database
      // were handled by the run which added them.
      if (saved) {
        await saveReviveToken(blockApi, address, {
          blockHeight: blockIndexer.blockHeight,
          blockTime: blockIndexer.blockTime,
        });
      }
    } catch (e) {
      logger.error(
        `Error in handling contract ${address} at ${blockIndexer.blockHeight}`,
        e,
      );
    }
  }
}

module.exports = {
  handleReviveContracts,
  collectCandidates,
  saveObservedContract,
};
