const { getRecoverableCol } = require("./db");

async function getActiveRecoverable(who) {
  const col = await getRecoverableCol();
  const q = { who, isActive: true };
  return await col.findOne(q);
}

async function getLatestRecoverable(who) {
  const col = await getRecoverableCol();
  const [recoverable] = await col
    .find({ who })
    .sort({ height: -1 })
    .limit(1)
    .toArray();
  return recoverable;
}

async function getActiveRecoverableOrThrow(who, blockHeight) {
  const col = await getRecoverableCol();
  const q = { who, isActive: true };
  const recoverable = await col.findOne(q);
  if (!recoverable) {
    throw new Error(`Can not find recoverable of ${who} at ${blockHeight}`);
  }

  return recoverable;
}

module.exports = {
  getActiveRecoverable,
  getActiveRecoverableOrThrow,
  getLatestRecoverable,
};
