const { updateInstanceDetails } = require("../../common/instance/update");
const {
  insertInstanceTimelineItem,
} = require("../../common/instance/timeline");
const {
  consts: { TimelineItemTypes },
} = require("@osn/scan-common");

async function handleApprovedTransferOrCancelled(event, indexer) {
  const [classId, instanceId, owner, delegate] = event.data.toJSON();
  await insertInstanceTimelineItem(classId, instanceId, {
    indexer,
    name: event.method,
    type: TimelineItemTypes.event,
    args: {
      classId,
      instanceId,
      owner,
      delegate,
    },
  });
  await updateInstanceDetails(classId, instanceId, indexer);
}

module.exports = {
  handleApprovedTransferOrCancelled,
};
