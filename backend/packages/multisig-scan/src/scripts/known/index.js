require("dotenv").config();

const {
  utils: { saveHeightsCommon },
} = require("@statescan/common");
const {
  multisig: { getMultisigCol, getTimelineCol, getAddressCol },
} = require("@statescan/mongo");

(async () => {
  const timelineCol = await getTimelineCol();
  await saveHeightsCommon(timelineCol);

  const multisigCol = await getMultisigCol();
  await saveHeightsCommon(multisigCol);

  const addressCol = await getAddressCol();
  await saveHeightsCommon(addressCol);

  process.exit(0);
})();
