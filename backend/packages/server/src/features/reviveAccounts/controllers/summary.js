const { HttpError } = require("../../../utils/httpError");
const {
  palletRevive: { getCallCol, getContractCol },
} = require("@statescan/mongo");
const { normalizeEvmAddress } = require("../../../common/evmAddress");
const { getAccountCallerQuery, getSubstrateCallerQuery } = require("../common");

async function getAccountReviveSummary(ctx) {
  const { address } = ctx.params;
  const evmAddress = normalizeEvmAddress(address);
  const callerQuery = evmAddress
    ? getAccountCallerQuery(evmAddress, ctx.query.substrateAddress)
    : getSubstrateCallerQuery(address);
  if (!callerQuery) {
    throw new HttpError(400, "invalid account address");
  }

  const callCol = await getCallCol();
  const contractCol = await getContractCol();
  const [callsCount, contractsCount] = await Promise.all([
    callCol.countDocuments(callerQuery),
    evmAddress
      ? contractCol.countDocuments({ deployer: evmAddress })
      : Promise.resolve(0),
  ]);

  ctx.body = {
    callsCount,
    contractsCount,
  };
}

module.exports = {
  getAccountReviveSummary,
};
