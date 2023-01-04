const { updateClassDetails } = require("../../common/class/update");
const { updateInstanceDetails } = require("../../common/instance/update");
const {
  insertInstanceTimelineItem,
} = require("../../common/instance/timeline");
const { updateInstancePrice } = require("../../common/instance/update");
const {
  consts: { TimelineItemTypes },
} = require("@osn/scan-common");

async function handleItemBought(event, indexer) {
  const [classId, instanceId, price, seller, buyer] = event.data.toJSON();
  await updateInstancePrice(classId, instanceId, indexer);
  await updateInstanceDetails(classId, instanceId, indexer);
  await updateClassDetails(classId, indexer);
  await insertInstanceTimelineItem(classId, instanceId, {
    indexer,
    name: event.method,
    type: TimelineItemTypes.event,
    args: {
      classId,
      instanceId,
      price,
      seller,
      buyer,
    },
  });
}

module.exports = {
  handleItemBought,
};
