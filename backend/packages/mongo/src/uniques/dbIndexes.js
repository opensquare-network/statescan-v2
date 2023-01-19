async function createClassIndexes(col) {
  await col.createIndex({ classId: 1 });
  await col.createIndex({ classId: 1, classHeight: 1 });
  await col.createIndex({ isDestroyed: 1 });
  await col.createIndex({ dataHash: 1 });
}

async function createInstanceIndexes(col) {
  await col.createIndex({ classId: 1 });
  await col.createIndex({ classId: 1, classHeight: 1 });
  await col.createIndex({ classId: 1, classHeight: 1, instanceId: 1 });
  await col.createIndex({ dataHash: 1 });
}

module.exports = {
  createClassIndexes,
  createInstanceIndexes,
};
