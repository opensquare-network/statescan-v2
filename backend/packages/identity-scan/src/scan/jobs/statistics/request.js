const {
  identity: { getRequestCol },
} = require("@statescan/mongo");

async function figureRequestCount() {
  const col = await getRequestCol();
  return await col.estimatedDocumentCount();
}

module.exports = {
  figureRequestCount,
};
