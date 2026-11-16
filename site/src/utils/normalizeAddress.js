import { encodeAddress, isEthereumAddress } from "@polkadot/util-crypto";
import { getAddress, isAddress } from "viem/utils";
import { getChainSettings } from "./chain";
import { formatEvmAddress } from "./reviveAddress";
import isNil from "lodash.isnil";

export function normalizeAddress(address) {
  if (!address) {
    return address;
  }

  // An EVM address is an H160, it must not be encoded as an AccountId32.
  if (isEthereumAddress(address)) {
    return formatEvmAddress(address);
  }

  const { ss58Format } = getChainSettings();
  if (isNil(ss58Format)) {
    return address;
  }
  return encodeAddress(address, ss58Format);
}

export function normalizeEvmAddress(address) {
  if (!address || !isAddress(address)) {
    return null;
  }

  return getAddress(address);
}
