function isNum(term) {
  return /^[0-9]+$/.test(term);
}

module.exports = { isNum };
