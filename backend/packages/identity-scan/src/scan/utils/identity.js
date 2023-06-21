const { dataAsString } = require("./dataAsString");
const { normalizeIdentityJudgements } = require("./judgement");
const {
  utils: { toDecimal128 },
} = require("@statescan/common");

function extractAdditional(additional) {
  return additional.reduce((other, [_key, _value]) => {
    const key = dataAsString(_key);
    const value = dataAsString(_value);

    if (key && value) {
      other[key] = value;
    }

    return other;
  }, {});
}

function extractIdentityInfo(rawIdentity) {
  const { info } = rawIdentity.unwrap();

  return {
    display: dataAsString(info.display),
    legal: dataAsString(info.legal),
    web: dataAsString(info.web),
    riot: dataAsString(info.riot),
    email: dataAsString(info.email),
    image: dataAsString(info.image),
    pgpFingerprint: info.pgpFingerprint.toJSON(),
    twitter: dataAsString(info.twitter),
    additional: extractAdditional(info.additional),
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
