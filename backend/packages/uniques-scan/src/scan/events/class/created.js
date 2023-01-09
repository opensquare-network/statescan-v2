const { insertClassTimelineItem } = require("../../common/class/timeline");
const { insertClassWithDetails } = require("../../common/class/insert");
const {
  consts: { TimelineItemTypes },
} = require("@osn/scan-common");

async function handleCreated(event, indexer) {
  const [classId, creator, owner] = event.data.toJSON();
  await insertClassWithDetails(classId, indexer);

  await insertClassTimelineItem(classId, {
    indexer,
    name: event.method,
    type: TimelineItemTypes.event,
    args: {
      classId,
      creator,
      owner,
    },
  });
}

module.exports = {
  handleCreated,
};
