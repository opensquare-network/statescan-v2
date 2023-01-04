const { updateClass } = require("../../common/class/update");
const { queryClassDetails } = require("../../query/class/details");
const {
  consts: { TimelineItemTypes },
} = require("@osn/scan-common");
const { insertClassTimelineItem } = require("../../common/class/timeline");

async function handleStatusChanged(event, indexer) {
  const [classId] = event.data.toJSON();
  const details = await queryClassDetails(classId, indexer.blockHash);
  await updateClass(classId, { details });

  const { owner, issuer, admin, freezer, freeHolding, isFrozen } = details;
  await insertClassTimelineItem(classId, {
    indexer,
    name: event.method,
    type: TimelineItemTypes.event,
    args: {
      classId,
      owner,
      issuer,
      admin,
      freezer,
      freeHolding,
      isFrozen,
    },
  });
}

module.exports = {
  handleStatusChanged,
};
