function isExemptedExtrinsic(extrinsic) {
  const { section, method } = extrinsic.method;
  return (
    (section === "parachainSystem" && method === "setValidationData") ||
    (section === "timestamp" && method === "set")
  );
}

module.exports = {
  isExemptedExtrinsic,
};
