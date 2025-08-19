const {
  chain: { findBlockApi },
} = require("@osn/scan-common");

async function getValidatorExposure(era, validatorStash, blockHash = null) {
  try {
    const blockApi = await findBlockApi(blockHash);
    const exposure = await blockApi.query.staking.erasStakers(
      era,
      validatorStash,
    );

    return {
      total: exposure.total.toString(),
      own: exposure.own.toString(),
      others: exposure.others.map((nominator) => ({
        who: nominator.who.toString(),
        value: nominator.value.toString(),
      })),
    };
  } catch (error) {
    console.error(
      `Error querying validator exposure for era ${era}, validator ${validatorStash}:`,
      error,
    );
    return null;
  }
}

async function getCurrentEra(blockHash = null) {
  try {
    const blockApi = await findBlockApi(blockHash);
    const activeEra = await blockApi.query.staking.activeEra();
    return activeEra.isSome ? activeEra.unwrap().index.toNumber() : null;
  } catch (error) {
    console.error("Error querying current era:", error);
    return null;
  }
}

async function isValidator(stash, blockHash = null) {
  try {
    const blockApi = await findBlockApi(blockHash);
    const validators = await blockApi.query.staking.validators(stash);

    return !validators.isEmpty;
  } catch (error) {
    console.error(`Error checking if ${stash} is validator:`, error);
    return false;
  }
}

async function getNominatorInfo(nominator, blockHash = null) {
  try {
    const blockApi = await findBlockApi(blockHash);
    const nominations = await blockApi.query.staking.nominators(nominator);

    if (nominations.isSome) {
      const nominationData = nominations.unwrap();
      return {
        targets: nominationData.targets.map((target) => target.toString()),
        submittedIn: nominationData.submittedIn.toNumber(),
      };
    }

    return null;
  } catch (error) {
    console.error(`Error querying nominator info for ${nominator}:`, error);
    return null;
  }
}

async function getStakingInfo(stash, era, blockHash) {
  const isVal = await isValidator(stash, blockHash);

  const result = {
    stash,
    era,
    isValidator: isVal,
    exposure: null,
    nominatorInfo: null,
  };

  if (isVal) {
    result.exposure = await getValidatorExposure(era, stash, blockHash);
  } else {
    result.nominatorInfo = await getNominatorInfo(stash, blockHash);
  }

  return result;
}

module.exports = {
  getValidatorExposure,
  getCurrentEra,
  isValidator,
  getNominatorInfo,
  getStakingInfo,
};
