import * as isIPFS from "is-ipfs";

export function isCid(cid) {
  return isIPFS.cid(cid) || isIPFS.base32cid(cid.toLowerCase());
}
