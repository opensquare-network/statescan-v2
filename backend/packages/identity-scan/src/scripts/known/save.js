const { peopleChainName } = require("../../scan/common/consts");
const {
  mongo: {
    known: { saveKnownHeights, getKnownHeightDb },
  },
} = require("@osn/scan-common");

async function savePeopleChainHeights(heights = []) {
  if (heights.length <= 0) {
    return;
  }

  const db = await getKnownHeightDb();
  const col = db.collection("peopleChainHeight");
  await col.createIndex({ height: 1 }, { unique: true });

  const bulk = col.initializeUnorderedBulkOp();
  for (const height of heights) {
    bulk.find({ height }).upsert().updateOne({ $set: { height } });
  }

  await bulk.execute();
}

async function saveHeightsCommon(col) {
  const items = await col.find({}).toArray();
  const heights = [];
  const peopleChainHeights = [];

  for (const item of items) {
    if (item.indexer) {
      const { chain, blockHeight } = item.indexer;
      if (peopleChainName === chain) {
        peopleChainHeights.push(blockHeight);
      } else {
        heights.push(blockHeight);
      }
    }

    if (item.timeline) {
      for (const timelineItem of item.timeline || []) {
        if (timelineItem.indexer) {
          const { chain, blockHeight } = item.indexer;
          if (peopleChainName === chain) {
            peopleChainHeights.push(blockHeight);
          } else {
            heights.push(blockHeight);
          }
        }
      }
    }
  }

  const uniqueHeights = [...new Set(heights)];
  await saveKnownHeights(uniqueHeights);

  const uniquePeopleChainHeights = [...new Set(peopleChainHeights)];
  await savePeopleChainHeights(uniquePeopleChainHeights);
}
