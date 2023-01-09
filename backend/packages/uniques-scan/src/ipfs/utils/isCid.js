async function isCid(cid) {
  const isIPFS = await import("is-ipfs");
  return isIPFS.cid(cid) || isIPFS.base32cid(cid.toLowerCase());
}

module.exports = {
  isCid,
};
