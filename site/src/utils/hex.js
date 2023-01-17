import { hexToString, isHex } from "@polkadot/util";
import { hexIsValidUTF8 } from "./utf8validate";

export default function maybeHexToUft8(hex) {
  return isHex(hex) && hexIsValidUTF8(hex) ? hexToString(hex) : hex;
}
