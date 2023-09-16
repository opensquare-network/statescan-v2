const { getMultisigCol } = require("../db");

async function insertMultisig(multisig) {
  const col = await getMultisigCol();
  await col.insertOne(multisig);
}

module.exports = {
  insertMultisig,
};
