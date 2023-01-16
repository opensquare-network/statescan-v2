const { updateClassDetails } = require("../../common/class/update");
const { updateInstance } = require("../../common/instance/update");
const {
  insertInstanceTimelineItem,
} = require("../../common/instance/timeline");
const {
  consts: { TimelineItemTypes },
} = require("@osn/scan-common");

async function handleBurned(event, indexer) {
  const [classId, instanceId, owner] = event.data.toJSON();
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
  await updateInstance(
    classId,
    instanceId,
    {
      isDestroyed: true,
      destroyedAt: indexer,
    },
    indexer,
  );
  await updateClassDetails(classId, indexer);
}

module.exports = {
  handleBurned,
};
