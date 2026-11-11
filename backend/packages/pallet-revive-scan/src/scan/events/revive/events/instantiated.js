const {
  chain: { findBlockApi },
  logger,
} = require("@osn/scan-common");
const { u8aToHex } = require("@polkadot/util");
const {
  palletRevive: { getContractCol },
} = require("@statescan/mongo");
const { normalizeAddress } = require("../../../common/call");

// The code hash of a contract is kept in its account info, the original code itself is
// stored once per code hash.
async function getContractCodeHash(blockApi, address) {
  const accountInfo = await blockApi.query.revive.accountInfoOf(address);
  const json = accountInfo?.isEmpty ? null : accountInfo.toJSON();
  return json?.accountType?.contract?.codeHash || null;
}

async function getPristineCode(blockApi, codeHash) {
  const code = await blockApi.query.revive.pristineCode(codeHash);
  if (!code || code.isEmpty) {
    return null;
  }

  // The storage value is length prefixed, only the code itself is kept.
  return u8aToHex(code.toU8a(true));
}

async function handleInstantiated(event, indexer) {
  const [deployer, contract] = event.data;
  const address = normalizeAddress(contract.toHex());
  if (!address) {
    logger.error(
      `Unexpected contract address at ${indexer.blockHeight}`,
      event.data,
    );
    return;
  }

  const blockApi = await findBlockApi(indexer.blockHash);
  let codeHash = null;
  let code = null;
  try {
    codeHash = await getContractCodeHash(blockApi, address);
    if (codeHash) {
      code = await getPristineCode(blockApi, codeHash);
    }
  } catch (e) {
    logger.error(
      `Error in querying code of contract ${address} at ${indexer.blockHeight}`,
      e,
    );
  }

  const col = await getContractCol();
  await col.insertOne({
    address,
    deployer: normalizeAddress(deployer.toHex()),
    codeHash,
    code,
    codeLen: code ? (code.length - 2) / 2 : null,
    indexer,
  });
}

module.exports = {
  handleInstantiated,
};
