import { parseAbi } from "viem";

export const LIDO_STETH_ADDRESS = "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84";
export const LIDO_WSTETH_ADDRESS = "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0";
export const LIDO_WITHDRAWAL_VAULT_ADDRESS =
  "0xB9D7934878B5FB9610B3fE8A5e441e8fad7E293f";
export const LIDO_REWARDS_VAULT_ADDRESS =
  "0x388C818CA8B9251b393131C08a736A67ccB19297";
export const LIDO_LOCATOR_ADDRESS =
  "0xC1d0b3DE6792Bf6b4b37EccdcC24e45978Cfd2Eb";

export const LIDO_BUFFERED_ETHER_ABI = parseAbi([
  "function getBufferedEther() view returns (uint256)",
]);

export const LIDO_STETH_SHARES_ABI = parseAbi([
  "function getPooledEthByShares(uint256) view returns (uint256)",
]);

export const WSTETH_RATE_ABI = parseAbi([
  "function stEthPerToken() view returns (uint256)",
  "function tokensPerStEth() view returns (uint256)",
]);

export const LIDO_NODE_OPERATORS_REGISTRY_ABI = parseAbi([
  "function getNodeOperatorSummary(uint256) view returns (uint256 targetLimitMode, uint256 targetValidatorsCount, uint256 stuckValidatorsCount, uint256 refundedValidatorsCount, uint256 stuckPenaltyEndTimestamp, uint256 totalExitedValidators, uint256 totalDepositedValidators, uint256 depositableValidatorsCount)",
]);

export const LIDO_CSM_NODE_OPERATOR_MANAGEMENT_PROPERTIES_ABI = parseAbi([
  "function getNodeOperatorManagementProperties(uint256) view returns (address managerAddress, address rewardAddress, bool extendedManagerPermissions)",
]);

export const LIDO_LOCATOR_ABI = parseAbi([
  "function accounting() view returns (address)",
  "function accountingOracle() view returns (address)",
  "function burner() view returns (address)",
  "function coreComponents() view returns (address, address, address, address, address, address)",
  "function depositSecurityModule() view returns (address)",
  "function elRewardsVault() view returns (address)",
  "function lazyOracle() view returns (address)",
  "function lido() view returns (address)",
  "function operatorGrid() view returns (address)",
  "function oracleDaemonConfig() view returns (address)",
  "function oracleReportComponents() view returns (address, address, address, address, address, address, address)",
  "function oracleReportSanityChecker() view returns (address)",
  "function postTokenRebaseReceiver() view returns (address)",
  "function predepositGuarantee() view returns (address)",
  "function stakingRouter() view returns (address)",
  "function treasury() view returns (address)",
  "function triggerableWithdrawalsGateway() view returns (address)",
  "function validatorExitDelayVerifier() view returns (address)",
  "function validatorsExitBusOracle() view returns (address)",
  "function vaultFactory() view returns (address)",
  "function vaultHub() view returns (address)",
  "function withdrawalQueue() view returns (address)",
  "function withdrawalVault() view returns (address)",
  "function wstETH() view returns (address)",
]);
