function bigGt(v1, v2) {
  return BigInt(v1) > BigInt(v2);
}

function bigIntAdd(v1, v2) {
  return (BigInt(v1) + BigInt(v2)).toString();
}

module.exports = {
  bigGt,
  bigIntAdd,
};
