function ignoreInExtrinsicList(call) {
  const { section, method } = call;
  return (
    (section === "parachainSystem" && method === "setValidationData") ||
    (section === "timestamp" && method === "set")
  );
}

module.exports = {
  ignoreInExtrinsicList,
};
