const status = Object.freeze({
  verified: "verified",
  erroneous: "erroneous",
  unverified: "unverified",
});

const judgement = Object.freeze({
  reasonable: "reasonable",
  knownGood: "knownGood",
  outOfDate: "outOfDate",
  lowQuality: "lowQuality",
  erroneous: "erroneous",
});

module.exports = {
  status,
  judgement,
};
