const {
  palletRevive: { getCallCol },
} = require("@statescan/mongo");
const {
  normalizeAddress,
  normalizeCodeData,
  getMethodHash,
} = require("../../../common/call");

async function saveCall({
  section,
  method,
  caller,
  dest,
  data,
  indexer,
  isSuccess,
}) {
  const calldata = normalizeCodeData(data);

  const col = await getCallCol();
  await col.insertOne({
    section,
    method,
    caller: caller || null,
    dest: normalizeAddress(dest),
    methodHash: getMethodHash(calldata),
    data: calldata,
    isSuccess,
    indexer,
  });
}

module.exports = {
  saveCall,
};
