const { isSimpleMode } = require("../env");

async function createBlockColIndexes(col) {
  await col.createIndex({ hash: 1 });
  await col.createIndex({ height: 1 }, { unique: true });
}

async function createExtrinsicColIndexes(col) {
  await col.createIndex({ "indexer.blockHeight": 1 });
  await col.createIndex({ "indexer.blockHash": 1 });
  await col.createIndex({
    "indexer.blockHeight": -1,
    "indexer.extrinsicIndex": 1,
  });

  if (isSimpleMode()) {
    await col.createIndex({ section: 1 });
    await col.createIndex({ method: 1 });
  } else {
    await col.createIndex({
      "call.section": 1,
      "indexer.blockHeight": -1,
      "indexer.extrinsicIndex": 1,
    });
    await col.createIndex({
      "call.section": 1,
      "call.method": 1,
      "indexer.blockHeight": -1,
      "indexer.extrinsicIndex": 1,
    });
    await col.createIndex({ hash: 1 });
  }

  await col.createIndex({ isSigned: 1 });
  await col.createIndex({ signer: 1 });
}

async function createEventColIndexes(col) {
  await col.createIndex({ "indexer.blockHeight": 1 });
  await col.createIndex({ "indexer.blockHash": 1 });
  await col.createIndex({
    "indexer.blockHeight": -1,
    "indexer.eventIndex": 1,
  });
  await col.createIndex({
    section: 1,
    "indexer.blockHeight": -1,
    "indexer.eventIndex": 1,
  });
  await col.createIndex({
    section: 1,
    method: 1,
    "indexer.blockHeight": -1,
    "indexer.eventIndex": 1,
  });
  await col.createIndex({
    isExtrinsic: 1,
    isExtrinsicResult: 1,
    "indexer.blockHeight": -1,
    "indexer.eventIndex": 1,
  });
  await col.createIndex({
    section: 1,
    method: 1,
    isExtrinsic: 1,
    isExtrinsicResult: 1,
    "indexer.blockHeight": -1,
    "indexer.eventIndex": 1,
  });
}

async function createCallColIndexes(col) {
  await col.createIndex({ "indexer.blockHeight": 1 });
  await col.createIndex({
    "indexer.blockHeight": -1,
    "indexer.extrinsicIndex": 1,
  });
  await col.createIndex({
    "indexer.blockHeight": -1,
    "indexer.extrinsicIndex": 1,
    "indexer.callIndex": 1,
  });
  await col.createIndex({
    section: 1,
    method: 1,
    "indexer.blockHeight": -1,
    "indexer.extrinsicIndex": 1,
  });
}

module.exports = {
  createBlockColIndexes,
  createExtrinsicColIndexes,
  createEventColIndexes,
  createCallColIndexes,
};
