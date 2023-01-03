const { insertClassTimelineItem } = require("../../common/class/timeline");
const { updateClassDetails } = require("../../common/class/update");
const {
  consts: { TimelineItemTypes },
} = require("@osn/scan-common");

async function handleRedeposited(event, indexer) {
  const [classId, successfulInstances] = event.data.toJSON();
  await updateClassDetails(classId, indexer);

  await insertClassTimelineItem(classId, {
    indexer,
    name: event.method,
    type: TimelineItemTypes.event,
    args: {
      classId,
      successfulInstances,
    },
  });
}

module.exports = {
  handleRedeposited,
};
