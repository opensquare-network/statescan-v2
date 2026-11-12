import { hexToU8a } from "@polkadot/util";
import { encodeAddress } from "@polkadot/util-crypto";
import { normalizeEvmAddress } from "./reviveAddress";

// pallet-revive derives an AccountId32 account for an EVM address by
// suffixing its 20 bytes with 12 0xEE bytes, see
// https://github.com/paritytech/polkadot-sdk/blob/master/substrate/frame/revive/src/address.rs
export function reviveEvmToSubstrateAddress(evmAddress, ss58Format) {
  const normalized = normalizeEvmAddress(evmAddress);
  if (!normalized) {
    return null;
  }

  const accountId = new Uint8Array(32).fill(0xee);
  accountId.set(hexToU8a(normalized), 0);

  return encodeAddress(accountId, ss58Format);
}
