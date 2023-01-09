const { insertClassTimelineItem } = require("../../common/class/timeline");
const { updateClassMetadata } = require("../../common/class/update");
const {
  consts: { TimelineItemTypes },
} = require("@osn/scan-common");

async function handleMetadataCleared(event, indexer) {
  const [classId] = event.data.toJSON();
  await updateClassMetadata(classId, indexer);

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
  handleMetadataCleared,
};
