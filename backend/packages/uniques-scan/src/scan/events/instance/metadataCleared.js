const { updateClassDetails } = require("../../common/class/update");
const {
  insertInstanceTimelineItem,
} = require("../../common/instance/timeline");
const { updateInstance } = require("../../common/instance/update");
const { queryInstanceMetadata } = require("../../query/instance/metadata");
const {
  consts: { TimelineItemTypes },
} = require("@osn/scan-common");

async function handleMetadataCleared(event, indexer) {
  const [classId, instanceId] = event.data.toJSON();
  const metadata = await queryInstanceMetadata(
    classId,
    instanceId,
    indexer.blockHash,
  );
  await updateInstance(
    classId,
    instanceId,
    { metadata: metadata || null },
    indexer,
  );
  await insertInstanceTimelineItem(classId, instanceId, {
    indexer,
    name: event.method,
    type: TimelineItemTypes.event,
    args: {
      classId,
      instanceId,
    },
  });

  await updateClassDetails(classId, indexer);
}

module.exports = {
  handleMetadataCleared,
};
