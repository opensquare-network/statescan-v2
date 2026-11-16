const { u8aToHex } = require("@polkadot/util");

// The code of a contract is stored once per code hash, and the value is length prefixed,
// only the code itself is kept.
async function getPristineCode(api, codeHash) {
  if (!codeHash) {
    return null;
  }

  const code = await api.query.revive.pristineCode(codeHash);
  if (!code || code.isEmpty) {
    return null;
  }

  return u8aToHex(code.toU8a(true));
}

function getCodeLen(code) {
  return code ? (code.length - 2) / 2 : null;
}

module.exports = {
  getPristineCode,
  getCodeLen,
};
