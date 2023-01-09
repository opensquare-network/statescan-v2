const {
  insertInstanceTimelineItem,
} = require("../../common/instance/timeline");
const { updateInstanceDetails } = require("../../common/instance/update");
const {
  consts: { TimelineItemTypes },
} = require("@osn/scan-common");

async function handleFrozenOrThawed(event, indexer) {
  const [classId, instanceId] = event.data.toJSON();
  await updateInstanceDetails(classId, instanceId, indexer);

  await insertInstanceTimelineItem(classId, instanceId, {
    indexer,
    name: event.method,
    type: TimelineItemTypes.event,
    args: {
      classId,
      instanceId,
    },
  });
}

module.exports = {
  handleFrozenOrThawed,
};
