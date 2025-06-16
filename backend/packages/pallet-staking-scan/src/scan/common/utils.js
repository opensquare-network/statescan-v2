function parseRewardDestination(dest) {
  let destType, destAccount;

  if (dest.isStaked) {
    destType = "Staked";
    destAccount = null;
  } else if (dest.isStash) {
    destType = "Stash";
    destAccount = null;
  } else if (dest.isController) {
    destType = "Controller";
    destAccount = null;
  } else if (dest.isAccount) {
    destType = "Account";
    destAccount = dest.asAccount.toString();
  } else if (dest.isNone) {
    destType = "None";
    destAccount = null;
  } else {
    destType = "Unknown";
    destAccount = null;
  }

  return { destType, destAccount };
}

module.exports = {
  parseRewardDestination,
};
