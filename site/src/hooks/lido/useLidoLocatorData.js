import { useLidoStatusData } from "./useLidoStatusData";

export const lidoLocatorAddressItems = [
  { name: "Accounting", functionName: "accounting" },
  { name: "Accounting Oracle", functionName: "accountingOracle" },
  { name: "Burner", functionName: "burner" },
  {
    name: "Core Components",
    functionName: "coreComponents",
    components: [
      "EL Rewards Vault",
      "Oracle Report Sanity Checker",
      "Staking Router",
      "Treasury",
      "Withdrawal Queue",
      "Withdrawal Vault",
    ],
  },
  {
    name: "Deposit Security Module",
    functionName: "depositSecurityModule",
  },
  { name: "EL Rewards Vault", functionName: "elRewardsVault" },
  { name: "Lazy Oracle", functionName: "lazyOracle" },
  { name: "Lido", functionName: "lido" },
  { name: "Operator Grid", functionName: "operatorGrid" },
  { name: "Oracle Daemon Config", functionName: "oracleDaemonConfig" },
  {
    name: "Oracle Report Components",
    functionName: "oracleReportComponents",
    components: [
      "Accounting Oracle",
      "Oracle Report Sanity Checker",
      "Burner",
      "Withdrawal Queue",
      "Post Token Rebase Receiver",
      "Staking Router",
      "Vault Hub",
    ],
  },
  {
    name: "Oracle Report Sanity Checker",
    functionName: "oracleReportSanityChecker",
  },
  {
    name: "Post Token Rebase Receiver",
    functionName: "postTokenRebaseReceiver",
  },
  { name: "Predeposit Guarantee", functionName: "predepositGuarantee" },
  { name: "Staking Router", functionName: "stakingRouter" },
  { name: "Treasury", functionName: "treasury" },
  {
    name: "Triggerable Withdrawals Gateway",
    functionName: "triggerableWithdrawalsGateway",
  },
  {
    name: "Validator Exit Delay Verifier",
    functionName: "validatorExitDelayVerifier",
  },
  {
    name: "Validators Exit Bus Oracle",
    functionName: "validatorsExitBusOracle",
  },
  { name: "Vault Factory", functionName: "vaultFactory" },
  { name: "Vault Hub", functionName: "vaultHub" },
  { name: "Withdrawal Queue", functionName: "withdrawalQueue" },
  { name: "Withdrawal Vault", functionName: "withdrawalVault" },
  { name: "wstETH", functionName: "wstETH" },
];

const emptyData = lidoLocatorAddressItems.map(({ name, functionName }) => ({
  name,
  functionName,
  address: null,
}));

export function useLidoLocatorData() {
  const queryResult = useLidoStatusData("lido-locator-addresses", {
    items: emptyData,
  });

  return {
    ...queryResult,
    data: queryResult.data?.items || emptyData,
  };
}

export function useLidoTreasuryAddressData() {
  const queryResult = useLidoStatusData("lido-locator-addresses", {
    items: [],
  });
  const treasury = queryResult.data?.items?.find(
    (item) => item.functionName === "treasury",
  );

  return { ...queryResult, data: treasury?.address ?? null };
}
