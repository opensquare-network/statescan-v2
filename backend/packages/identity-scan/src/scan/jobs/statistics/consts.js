const status = Object.freeze({
  verified: "verified",
  erroneous: "erroneous",
  unverified: "unverified",
});

const judgement = Object.freeze({
  Reasonable: "Reasonable",
  KnownGood: "KnownGood",
  OutOfDate: "OutOfDate",
  LowQuality: "LowQuality",
  Erroneous: "Erroneous",
});

module.exports = {
  status,
  judgement,
};
