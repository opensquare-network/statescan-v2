import { parseAbi } from "viem";

export const LIDO_BALANCE_ABI = parseAbi([
  "function balanceOf(address account) view returns (uint256)",
  "function sharesOf(address account) view returns (uint256)",
]);

export const LIDO_STETH_ADDRESS = "0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84";
export const LIDO_WSTETH_ADDRESS = "0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0";
export const LIDO_WITHDRAWAL_VAULT_ADDRESS =
  "0xB9D7934878B5FB9610B3fE8A5e441e8fad7E293f";
export const LIDO_REWARDS_VAULT_ADDRESS =
  "0x388C818CA8B9251b393131C08a736A67ccB19297";
export const LIDO_LOCATOR_ADDRESS =
  "0xC1d0b3DE6792Bf6b4b37EccdcC24e45978Cfd2Eb";
export const LIDO_EARN_ETH_VAULT_ADDRESS =
  "0x6a37725ca7f4CE81c004c955f7280d5C704a249e";
export const LIDO_EARN_USD_VAULT_ADDRESS =
  "0x014e6DA8F283C4aF65B2AA0f201438680A004452";
