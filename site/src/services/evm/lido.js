import { parseAbi } from "viem";

export const LIDO_STETH_ADDRESS = "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84";
export const LIDO_WSTETH_ADDRESS = "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0";
export const LIDO_WITHDRAWAL_VAULT_ADDRESS =
  "0xB9D7934878B5FB9610B3fE8A5e441e8fad7E293f";
export const LIDO_REWARDS_VAULT_ADDRESS =
  "0x388C818CA8B9251b393131C08a736A67ccB19297";

export const LIDO_BUFFERED_ETHER_ABI = parseAbi([
  "function getBufferedEther() view returns (uint256)",
]);

export const WSTETH_RATE_ABI = parseAbi([
  "function stEthPerToken() view returns (uint256)",
  "function tokensPerStEth() view returns (uint256)",
]);
