const {
  identity: { getStatisticsCol },
} = require("@statescan/mongo");

const defaultGeneral = {
  identity: {
    verified: 0,
    unverified: 0,
    erroneous: 0,
  },
  subIdentity: 0,
  request: 0,
};

function enrichIdentity(identityObj = {}) {
  const result = { ...identityObj };
  result.verified = result.verified || 0;
  result.unverified = result.unverified || 0;
  result.erroneous = result.erroneous || 0;

  return result;
}

async function statistics() {
  const col = await getStatisticsCol();
  const records = await col.find({}).toArray();
  let generalRecord = records.find((record) => record.name === "general");
  if (!generalRecord) {
    generalRecord = defaultGeneral;
  }
  const totalGiven = records.find(
    (record) => record.name === "totalJudgementGiven",
  );

  return {
    identity: enrichIdentity(generalRecord.identity),
    subIdentity: generalRecord.subIdentity,
    request: generalRecord.request,
    judgementGiven: totalGiven?.value || 0,
  };
}

module.exports = {
  statistics,
};
