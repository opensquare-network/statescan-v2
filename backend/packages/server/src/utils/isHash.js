function isHash(term = "") {
  return /^0x[0-9a-f]{64}$/.test(term);
}

module.exports = {
  isHash,
};
