const { updateClass } = require("../../common/class/update");
const { insertClassTimelineItem } = require("../../common/class/timeline");
const {
  consts: { TimelineItemTypes },
} = require("@osn/scan-common");

async function handleDestroyed(event, indexer) {
  const [classId] = event.data.toJSON();
  await insertClassTimelineItem(classId, {
    indexer,
    name: event.method,
    type: TimelineItemTypes.event,
    args: {
      classId,
    },
  });
  await updateClass(classId, {
    isDestroyed: true,
    destroyedAt: indexer,
  });
}

module.exports = {
  handleDestroyed,
};
