const {
  store: { getMetadataByBlockHash },
  chain: { getMetadataSectionCalls },
} = require("@statescan/common");

async function hasPayoutValidatorCall(blockHash) {
  const metadata = await getMetadataByBlockHash(blockHash);
  const calls = await getMetadataSectionCalls("Staking", metadata);
  return (calls || []).includes("payoutValidator");
}

module.exports = {
  hasPayoutValidatorCall,
};
