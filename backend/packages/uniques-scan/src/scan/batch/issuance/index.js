const { updateClassDetails } = require("../../common/class/update");
const { getClassIdHeightMap } = require("./class");
const { getBlockIssuance } = require("../../store/blockInstances");
const {
  uniques: { getInstanceCol, getInstanceTimelineCol },
} = require("@statescan/mongo");
const {
  consts: { TimelineItemTypes },
} = require("@osn/scan-common");

function getInstanceDetailWhenIssued(owner) {
  return {
    owner,
    approved: null,
    isFrozen: false,
    deposit: 0,
  };
}

function getClassIds(arr = []) {
  const classIds = arr.map((issuance) => issuance.classId);
  return [...new Set(classIds)];
}

async function handleBlockIssuance(blockIndexer) {
  const issuanceArr = getBlockIssuance(blockIndexer.blockHeight);
  if (issuanceArr.length <= 0) {
    return;
  }

  const classIds = getClassIds(issuanceArr);
  const classIdHeightMap = await getClassIdHeightMap(classIds);

  const instanceCol = await getInstanceCol();
  const instanceBulk = instanceCol.initializeUnorderedBulkOp();
  const timelineCol = await getInstanceTimelineCol();
  const timelineBulk = timelineCol.initializeUnorderedBulkOp();

  for (const { classId, instanceId, owner, indexer } of issuanceArr) {
    const classHeight = classIdHeightMap[classId];
    if (!classHeight) {
      throw `can not find classHeight of classId ${classId} at ${indexer.blockHeight}`;
    }

    instanceBulk.insert({
      classId,
      classHeight,
      instanceId,
      instanceHeight: indexer.blockHeight,
      indexer,
      details: getInstanceDetailWhenIssued(owner),
      isDestroyed: false,
    });

    timelineBulk.insert({
      classId,
      classHeight,
      instanceId,
      instanceHeight: indexer.blockHeight,
      indexer,
      name: "Issued",
      type: TimelineItemTypes.event,
      args: {
        classId,
        instanceId,
        owner,
      },
    });
  }

  await instanceBulk.execute();
  await timelineBulk.execute();

  for (const classId of classIds) {
    await updateClassDetails(classId, blockIndexer);
  }
}

module.exports = {
  handleBlockIssuance,
};
