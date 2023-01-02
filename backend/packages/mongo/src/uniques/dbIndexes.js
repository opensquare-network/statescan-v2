async function createClassIndexes(col) {
  await col.createIndex({ classId: 1 });
  await col.createIndex({ classId: 1, classHeight: 1 });
  await col.createIndex({ isDestroyed: 1 });
}

module.exports = {
  createClassIndexes,
};
