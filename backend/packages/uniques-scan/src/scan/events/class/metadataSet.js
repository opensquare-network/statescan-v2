const { insertClassTimelineItem } = require("../../common/class/timeline");
const { updateClassMetadata } = require("../../common/class/update");
const {
  consts: { TimelineItemTypes },
} = require("@osn/scan-common");

async function handleMetadataSet(event, indexer) {
  const [classId, data, isFrozen] = event.data.toJSON();
  await updateClassMetadata(classId, indexer);

  await insertClassTimelineItem(classId, {
    indexer,
    name: event.method,
    type: TimelineItemTypes.event,
    args: {
      classId,
      data,
      isFrozen,
    },
  });
}

module.exports = {
  handleMetadataSet,
};
