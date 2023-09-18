const { getMultisigCol } = require("../db");
const { busLogger: logger } = require("@statescan/common");
const isEmpty = require("lodash.isempty");

async function getUnFinalMultisigById(id) {
  const col = await getMultisigCol();
  return await col.findOne({ id, isFinal: false });
}

async function getMultisigById(id) {
  const col = await getMultisigCol();
  return await col.findOne({ id });
}

async function insertMultisig(multisig) {
  const col = await getMultisigCol();
  await col.insertOne(multisig);
}

async function updateMultisig(id, updates = {}, indexer) {
  const col = await getMultisigCol();
  const maybeMultisig = await col.findOne({ id, isFinal: false });
  if (!maybeMultisig) {
    logger.error(
      `Can not find multisig when update it at ${indexer.blockHeight}`,
    );
    return;
  }

  if (isEmpty(updates)) {
    return;
  }

  await col.updateOne({ id, isFinal: false }, { $set: updates });
}

module.exports = {
  insertMultisig,
  updateMultisig,
  getUnFinalMultisigById,
  getMultisigById,
};
