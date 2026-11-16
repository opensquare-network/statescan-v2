import { hasRevive } from "./chain";
import { isEvmAddress } from "./reviveAddress";

// EVM addresses are only browsable as accounts on chains which run pallet-revive.
export function isReviveEvmAddress(address) {
  return hasRevive() && isEvmAddress(address);
}
