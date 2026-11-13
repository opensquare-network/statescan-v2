const {
  palletRevive: { getContractCol, getTokenCol, getVerifiedContractCol },
} = require("@statescan/mongo");
const { logger } = require("@osn/scan-common");
// The getter calls of the EIP-20 metadata, shared with the sweep of the token list.
const { readTokenMetadata } = require("../../scripts/tokens/erc20");

// The scan detects a token as soon as it indexes the contract, so the token list of the
// chain follows the blocks without another sweep. The one of
// src/scripts/tokens/syncTokens.js is still needed for the contracts indexed before this
// hook and for the precompiles of the pallet assets, which are not deployed contracts.
async function saveReviveToken(api, address, readAt) {
  try {
    const metadata = await readTokenMetadata(api, address);
    // A contract which reverts, answers nothing or answers something which does not
    // decode is not a token.
    if (!metadata) {
      return false;
    }

    const contractCol = await getContractCol();
    const contract = await contractCol.findOne(
      { address },
      { projection: { _id: 0, deployer: 1, codeHash: 1, indexer: 1 } },
    );
    const verifiedCol = await getVerifiedContractCol();
    const verified = await verifiedCol.findOne(
      { address },
      { projection: { _id: 1 } },
    );
    const tokenCol = await getTokenCol();

    await tokenCol.updateOne(
      { address },
      {
        $set: {
          address,
          ...metadata,
          standard: "ERC20",
          verified: !!verified,
          deployer: contract?.deployer ?? null,
          codeHash: contract?.codeHash ?? null,
          indexer: contract?.indexer ?? null,
          readAt,
          updatedAt: new Date(),
        },
      },
      { upsert: true },
    );

    return true;
  } catch (e) {
    // Reading a contract must not fail the scan of its block, the token is picked up by
    // the next sweep instead.
    logger.error(`Error in reading the token metadata of ${address}`, e);
    return false;
  }
}

module.exports = {
  saveReviveToken,
};
