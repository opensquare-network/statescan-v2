const { peopleChainName } = require("../../scan/common/consts");
const {
  mongo: {
    known: { saveKnownHeights },
  },
} = require("@osn/scan-common");

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
  console.log(uniquePeopleChainHeights);
  // todo: save people chain heights
}
