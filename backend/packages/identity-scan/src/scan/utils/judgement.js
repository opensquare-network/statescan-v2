function normalizeJudgement(judgement) {
  return judgement?.toString();
}

function normalizeIdentityJudgements(judgements = []) {
  return judgements.map(([registrarIndex, judgement]) => {
    return {
      registrarIndex: registrarIndex.toNumber(),
      judgement: normalizeJudgement(judgement),
    };
  });
}

module.exports = {
  normalizeJudgement,
  normalizeIdentityJudgements,
};
