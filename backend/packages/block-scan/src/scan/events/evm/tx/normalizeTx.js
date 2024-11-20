function normalizeTx(tx) {
  return {
    ...tx,
    gasPrice: tx.gasPrice.toString(),
    v: tx.v.toString(),
    value: tx.value.toString(),
  };
}

module.exports = {
  normalizeTx,
};
