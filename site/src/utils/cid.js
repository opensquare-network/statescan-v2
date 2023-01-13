import * as isIPFS from "is-ipfs";

export function isCid(cid) {
  if (!cid) {
    return false;
  }
  return isIPFS.cid(cid) || isIPFS.base32cid(cid.toLowerCase());
}
