const {
  runtime: { getRuntimeCollection },
} = require("@statescan/mongo");

async function batchInsertVersions(versions = []) {
  if (versions.length < 1) {
    return;
  }

  const col = await getRuntimeCollection();
  const bulk = col.initializeUnorderedBulkOp();
  for (const version of versions) {
    bulk.insert(version);
  }
  await bulk.execute();
}

module.exports = {
  batchInsertVersions,
};
