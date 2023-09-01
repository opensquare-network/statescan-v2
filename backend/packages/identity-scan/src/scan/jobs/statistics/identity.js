const {
  identity: { getIdentityCol },
} = require("@statescan/mongo");
const countBy = require("lodash.countby");
const { status, judgement } = require("./consts");

async function getAllIdentities() {
  const col = await getIdentityCol();
  return await col
    .find({ isSub: false }, { projection: { _id: 0, judgements: 1 } })
    .toArray();
}

async function figureIdentity() {
  const identities = await getAllIdentities();
  return countBy(identities, ({ judgements = [] }) => {
    const isVerified = judgements.some(({ judgement: judgementGiven }) => {
      return [judgement.Reasonable, judgement.KnownGood].includes(
        judgementGiven,
      );
    });
    if (isVerified) {
      return status.verified;
    }

    const isErroneous = judgements.some(({ judgement: judgementGiven }) => {
      return [judgement.Erroneous, judgement.LowQuality].includes(
        judgementGiven,
      );
    });
    if (isErroneous) {
      return status.erroneous;
    }

    return status.unverified;
  });
}

module.exports = {
  figureIdentity,
};
