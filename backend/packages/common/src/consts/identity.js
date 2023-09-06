const IdentityVerificationType = Object.freeze({
  verified: 1,
  unVerified: 2,
  erroneous: 3,
});

const IdentityJudgement = Object.freeze({
  Reasonable: "Reasonable",
  KnownGood: "KnownGood",
  OutOfDate: "OutOfDate",
  LowQuality: "LowQuality",
  Erroneous: "Erroneous",
});

module.exports = {
  IdentityVerificationType,
  IdentityJudgement,
};
