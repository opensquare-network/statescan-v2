function escapeRegex(term) {
  return term.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}

module.exports = {
  escapeRegex,
};
