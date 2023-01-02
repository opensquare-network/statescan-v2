const { insertClassTimelineItem } = require("../../common/class/timeline");
const { insertClassWithDetails } = require("../../common/class/insert");
const {
  consts: { TimelineItemTypes },
} = require("@osn/scan-common");

async function handleForceCreated(event, indexer) {
  const [classId, owner] = event.data.toJSON();
  await insertClassWithDetails(classId, indexer);

  await insertClassTimelineItem(classId, {
    indexer,
    name: event.method,
    type: TimelineItemTypes.event,
    args: {
      classId,
      owner,
    },
  });
}

module.exports = {
  handleForceCreated,
};
