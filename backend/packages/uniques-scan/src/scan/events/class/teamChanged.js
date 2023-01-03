const { insertClassTimelineItem } = require("../../common/class/timeline");
const { updateClassDetails } = require("../../common/class/update");
const {
  consts: { TimelineItemTypes },
} = require("@osn/scan-common");

async function handleTeamChanged(event, indexer) {
  const [classId, issuer, admin, freezer] = event.data.toJSON();
  await updateClassDetails(classId, indexer);
  await insertClassTimelineItem(classId, {
    indexer,
    name: event.method,
    type: TimelineItemTypes.event,
    args: {
      classId,
      issuer,
      admin,
      freezer,
    },
  });
}

module.exports = {
  handleTeamChanged,
};
