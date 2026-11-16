import isNil from "lodash.isnil";
import EvmAddress from "./evmAddress";
import { formatLidoBp } from "../../utils/viewFuncs/lido";

export function toBpRow(label, value) {
  if (isNil(value)) {
    return null;
  }

  return [label, formatLidoBp(value)];
}

export function toIntegerRow(label, value) {
  if (isNil(value)) {
    return null;
  }

  return [label, value];
}

export function toAddressRow(label, address) {
  if (!address) {
    return null;
  }

  return [label, <EvmAddress address={address} />];
}
