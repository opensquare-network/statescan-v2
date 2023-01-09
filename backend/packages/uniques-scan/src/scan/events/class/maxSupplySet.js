const { updateClass } = require("../../common/class/update");
const { insertClassTimelineItem } = require("../../common/class/timeline");
const {
  consts: { TimelineItemTypes },
} = require("@osn/scan-common");

async function handleMaxSupplySet(event, indexer) {
  const [classId, maxSupply] = event.data.toJSON();
  await updateClass(classId, { maxSupply });
  await insertClassTimelineItem(classId, {
    indexer,
    name: event.method,
    type: TimelineItemTypes.event,
    args: {
      classId,
      maxSupply,
    },
  });
}

module.exports = {
  handleMaxSupplySet,
};
