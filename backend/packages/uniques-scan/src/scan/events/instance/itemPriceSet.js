const {
  insertInstanceTimelineItem,
} = require("../../common/instance/timeline");
const { updateInstancePrice } = require("../../common/instance/update");
const {
  consts: { TimelineItemTypes },
} = require("@osn/scan-common");

async function handleItemPriceSet(event, indexer) {
  const [classId, instanceId, price, whitelistedBuyer] = event.data.toJSON();
  await updateInstancePrice(classId, instanceId, indexer);

  await insertInstanceTimelineItem(classId, instanceId, {
    indexer,
    name: event.method,
    type: TimelineItemTypes.event,
    args: {
      classId,
      instanceId,
      price,
      whitelistedBuyer,
    },
  });
}

module.exports = {
  handleItemPriceSet,
};
