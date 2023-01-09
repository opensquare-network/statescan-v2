const { insertClassTimelineItem } = require("../../common/class/timeline");
const { updateClassDetails } = require("../../common/class/update");
const {
  consts: { TimelineItemTypes },
} = require("@osn/scan-common");

async function handleFrozenOrThawed(event, indexer) {
  const [classId] = event.data.toJSON();
  await updateClassDetails(classId, indexer);
  await insertClassTimelineItem(classId, {
    indexer,
    name: event.method,
    type: TimelineItemTypes.event,
    args: {
      classId,
    },
  });
}

module.exports = {
  handleFrozenOrThawed,
};
