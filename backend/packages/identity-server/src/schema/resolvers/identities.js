const {
  identity: { getIdentityCol },
} = require("@statescan/mongo");
const {
  utils: { isValidAddress },
  consts: { IdentityVerificationType },
} = require("@statescan/common");
const trim = require("lodash.trim");

function getVerificationValue(statusEnumValue) {
  if (statusEnumValue === "VERIFIED") {
    return IdentityVerificationType.verified;
  } else if (statusEnumValue === "UNVERIFIED") {
    return IdentityVerificationType.unVerified;
  } else if (statusEnumValue === "ERRONEOUS") {
    return IdentityVerificationType.erroneous;
  }

  throw new Error(`Unknown verification status enum value, ${statusEnumValue}`);
}

async function identities(_, _args) {
  const {
    offset,
    limit,
    search = "",
    identityType,
    verificationStatus,
  } = _args;
  const trimmedSearch = trim(search);
  let q;
  if (!trimmedSearch) {
    q = {};
  } else if (isValidAddress(trimmedSearch)) {
    q = { account: trimmedSearch };
  } else {
    q = { fullDisplay: new RegExp(trimmedSearch, "i") };
  }

  if (identityType) {
    Object.assign(q, { isSub: identityType !== "DIRECT" });
  }

  if (verificationStatus) {
    Object.assign(q, {
      verification: getVerificationValue(verificationStatus),
    });
  }

  const col = await getIdentityCol();
  const identities = await col
    .find(q, { projection: { _id: 0 } })
    .sort({ "lastUpdate.blockHeight": -1 })
    .skip(offset)
    .limit(limit)
    .toArray();
  const total = await col.countDocuments(q);

  return {
    identities,
    offset,
    limit,
    total,
  };
}

module.exports = {
  identities,
};
