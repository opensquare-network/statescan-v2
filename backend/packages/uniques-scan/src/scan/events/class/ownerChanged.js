const { insertClassTimelineItem } = require("../../common/class/timeline");
const { updateClassDetails } = require("../../common/class/update");
const {
  consts: { TimelineItemTypes },
} = require("@osn/scan-common");

async function handleOwnerChanged(event, indexer) {
  const [classId, newOwner] = event.data.toJSON();
  await updateClassDetails(classId, indexer);
  await insertClassTimelineItem(classId, {
    indexer,
    name: event.method,
    type: TimelineItemTypes.event,
    args: {
      classId,
      newOwner,
    },
  });
}

module.exports = {
  handleOwnerChanged,
};
