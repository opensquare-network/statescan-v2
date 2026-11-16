const { HttpError } = require("../../../utils/httpError");
const {
  palletRevive: { getContractCol, getCallCol },
} = require("@statescan/mongo");
const { normalizeContractAddress } = require("../common");

async function getContract(ctx) {
  const address = normalizeContractAddress(ctx.params.address);
  if (!address) {
    throw new HttpError(400, "invalid contract address");
  }

  const col = await getContractCol();
  const contract = await col.findOne(
    { address },
    // The code itself is big and not needed by the detail page, its size is enough.
    { projection: { _id: 0, code: 0 } },
  );
  if (!contract) {
    throw new HttpError(404, "contract not found");
  }

  const callCol = await getCallCol();
  const callsCount = await callCol.countDocuments({ dest: address });

  ctx.body = {
    ...contract,
    callsCount,
  };
}

module.exports = {
  getContract,
};
