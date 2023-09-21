function sortApprovals(approvals = []) {
  const arr = [...new Set(approvals)];
  return arr.sort((a, b) => (a > b ? 1 : -1));
}

module.exports = {
  sortApprovals,
};
