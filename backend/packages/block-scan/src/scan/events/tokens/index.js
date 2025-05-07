const { handleTokensTransfer } = require("./transfer");

async function handleTokensEvent(event) {
  if (!["interlay", "kintsugi"].includes(process.env.CHAIN)) {
    return;
  }

  const { section, method } = event;
  if (section !== "tokens") {
    return false;
  }

  if ("Transfer" === method) {
    await handleTokensTransfer(...arguments);
  }
}

module.exports = {
  handleTokensEvent,
};
