const {
  consts: { IdentityJudgement, IdentityVerificationType },
} = require("@statescan/common");

function getVerificationType(display, judgements) {
  if (!display) {
    // keep consistent with fronted verification view. We don't show verification status if no display set even if
    // good judgements are given.
    return null;
  }

  const isAuthorized = judgements?.some?.(
    (j) =>
      j.judgement === IdentityJudgement.Reasonable ||
      j.judgement === IdentityJudgement.KnownGood,
  );
  if (isAuthorized) {
    return IdentityVerificationType.verified;
  }

  const isBad = judgements?.some?.(
    (j) =>
      j.judgement === IdentityJudgement.Erroneous ||
      j.judgement === IdentityJudgement.LowQuality,
  );
  if (isBad) {
    return IdentityVerificationType.erroneous;
  }

  return IdentityVerificationType.unVerified;
}

module.exports = {
  getVerificationType,
};
