async function getAccountData(api, address) {
  const promises = [
    api.query.system.account(address),
    api.derive.balances?.all(address).catch(() => null),
    api.derive.staking?.account(address).catch(() => null),
  ];
  if (["interlay", "kintsugi"].includes(process.env.CHAIN)) {
    promises.push(api.query.tokens.accounts(address, { token: "INTR" }));
  }

  const [account, balanceAll, stakingInfo, intrTokens] = await Promise.all(
    promises,
  );

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
    intrTokens,
  };
}

module.exports = {
  getAccountData,
};
