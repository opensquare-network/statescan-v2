async function getAccountData(api, address) {
  const [account, balanceAll, stakingInfo] = await Promise.all([
    api.query.system.account(address),
    api.derive.balances?.all(address).catch(() => null),
    api.derive.staking?.account(address).catch(() => null),
  ]);

  if (!account) {
    return null;
  }

  const accountInfo = api.registry.createType(
    "AccountInfo",
    account.toHex(),
    true,
  );

  return {
    systemAccount: account,
    account: accountInfo,
    balanceAll,
    stakingInfo,
  };
}

module.exports = {
  getAccountData,
};
