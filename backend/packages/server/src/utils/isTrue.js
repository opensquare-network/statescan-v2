function isTrue(param) {
  return [true, 1, "true", "TRUE", "1"].includes(param);
}

module.exports = {
  isTrue,
};
