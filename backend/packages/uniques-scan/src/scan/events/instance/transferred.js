const { updateInstanceDetails } = require("../../common/instance/update");
const {
  insertInstanceTimelineItem,
} = require("../../common/instance/timeline");
const { insertInstanceTransfer } = require("../../common/instance/transfer");
const {
  consts: { TimelineItemTypes },
} = require("@osn/scan-common");

async function handleTransferred(event, indexer) {
  const [classId, instanceId, from, to] = event.data.toJSON();
  await insertInstanceTransfer(classId, instanceId, from, to, indexer);

  await insertInstanceTimelineItem(classId, instanceId, {
    indexer,
    name: event.method,
    type: TimelineItemTypes.event,
    args: {
      classId,
      instanceId,
      from,
      to,
    },
  });
  await updateInstanceDetails(classId, instanceId, indexer);
}

module.exports = {
  handleTransferred,
};
