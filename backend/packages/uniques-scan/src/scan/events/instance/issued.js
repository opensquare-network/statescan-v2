const { addIssuance } = require("../../store/blockInstances");
const { updateClassDetails } = require("../../common/class/update");
const {
  insertInstanceTimelineItem,
} = require("../../common/instance/timeline");
const { insertInstanceWithDetails } = require("../../common/instance/insert");
const {
  consts: { TimelineItemTypes },
} = require("@osn/scan-common");

function shouldHandleWithBatch(eventRecords) {
  const hasNoMetadataEvent = eventRecords.every(({ event }) => {
    const { method } = event;
    return !["MetadataSet", "MetadataCleared"].includes(method);
  });
  const issuedEventsCount = eventRecords.filter(
    ({ event }) => "Issued" === event.method,
  ).length;

  return hasNoMetadataEvent && issuedEventsCount > 1;
}

async function handleIssued(event, indexer, blockEvents) {
  const [classId, instanceId, owner] = event.data.toJSON();
  // nft owners may mint many instances in one block, and we handle this in batch for performance reason.
  if (shouldHandleWithBatch(blockEvents)) {
    addIssuance(indexer.blockHeight, { classId, instanceId, owner, indexer });
    return;
  }

  await insertInstanceWithDetails(classId, instanceId, indexer);
  await insertInstanceTimelineItem(classId, instanceId, {
    indexer,
    name: event.method,
    type: TimelineItemTypes.event,
    args: {
      classId,
      instanceId,
      owner,
    },
  });

  await updateClassDetails(classId, indexer);
}

module.exports = {
  handleIssued,
};
