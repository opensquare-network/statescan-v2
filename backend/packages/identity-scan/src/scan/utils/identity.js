const { normalizeIdentityJudgements } = require("./judgement");
const {
  utils: { toDecimal128 },
} = require("@statescan/common");

function extractIdentityInfo(rawIdentity) {
  const { info } = rawIdentity.unwrap();

  return {
    display: info.display.asRaw.toHuman(),
    legal: info.legal.asRaw.toHuman(),
    web: info.web.asRaw.toHuman(),
    riot: info.riot.asRaw.toHuman(),
    email: info.email.asRaw.toHuman(),
    image: info.image.asRaw.toHuman(),
    pgpFingerprint: info.pgpFingerprint.toJSON(),
    twitter: info.twitter.asRaw.toHuman(),
    additional: info.additional.toJSON(),
  };
}

function normalizeIdentity(onchainIdentity) {
  if (!onchainIdentity) {
    return null;
  }

  if (!onchainIdentity.isSome) {
    return null;
  }

  const { judgements, deposit } = onchainIdentity.unwrap();
  const info = extractIdentityInfo(onchainIdentity);
  return {
    info,
    judgements: normalizeIdentityJudgements(judgements),
    deposit: toDecimal128(deposit),
  };
}

module.exports = {
  extractIdentityInfo,
  normalizeIdentity,
};
