import isUtf8 from "is-utf8";
import { Buffer } from "buffer";

export function hexIsValidUTF8(hexString) {
  return isUtf8(Buffer.from(hexString.substr(2), "hex"));
}
