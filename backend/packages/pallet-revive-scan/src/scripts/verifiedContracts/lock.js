const LOCK_ID = "verifiedContractSync";

function log(...args) {
  console.log(new Date().toISOString(), ...args);
}

// The lock lives in its own collection so an expired document never blocks the
// collection from being used, a run which crashed is taken over after the ttl.
async function acquireLock(db, ttlMs, owner) {
  const col = await db.createCol("syncLock");
  const now = Date.now();

  try {
    const doc = await col.findOneAndUpdate(
      { _id: LOCK_ID, expiresAt: { $lt: new Date(now) } },
      {
        $set: {
          owner,
          acquiredAt: new Date(now),
          expiresAt: new Date(now + ttlMs),
        },
      },
      { upsert: true, returnDocument: "after" },
    );

    return { acquired: !!doc, col };
  } catch (error) {
    // The upsert inserts when no expired lock matches, a duplicate id means
    // another run holds the lock.
    if (error.code === 11000) {
      return { acquired: false, col };
    }

    throw error;
  }
}

function startHeartbeat(col, ttlMs, owner) {
  const interval = setInterval(async () => {
    try {
      await col.updateOne(
        { _id: LOCK_ID, owner },
        { $set: { expiresAt: new Date(Date.now() + ttlMs) } },
      );
    } catch (error) {
      log("Failed to refresh the sync lock", error.message);
    }
  }, Math.max(1000, Math.floor(ttlMs / 3)));
  interval.unref();

  return interval;
}

async function releaseLock(col, owner) {
  await col.deleteOne({ _id: LOCK_ID, owner });
}

module.exports = {
  acquireLock,
  startHeartbeat,
  releaseLock,
};
