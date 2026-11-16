const { u8aConcat, u8aToHex } = require("@polkadot/util");
const { keccakAsU8a, secp256k1Recover } = require("@polkadot/util-crypto");

// A typed transaction (EIP-2718) starts with a type byte below 0xc0, a legacy one
// starts directly with the RLP list of its fields.
const MAX_TYPED_TRANSACTION_TYPE = 0x7f;

const RLP_SHORT_STRING_LIMIT = 0x37;
const RLP_LONG_STRING_OFFSET = 0xb7;
const RLP_SHORT_LIST_OFFSET = 0xc0;
const RLP_LONG_LIST_OFFSET = 0xf7;

// Field positions of the parts we care about, per transaction type. `unsigned` is the
// number of leading fields covered by the signature, which is what the signing hash is
// computed on.
const TRANSACTION_LAYOUTS = {
  // legacy: nonce, gasPrice, gas, to, value, data, v, r, s
  0: { to: 3, data: 5, v: 6, r: 7, s: 8, unsigned: 6 },
  // EIP-2930: chainId, nonce, gasPrice, gas, to, value, data, accessList, v, r, s
  1: { to: 4, data: 6, v: 8, r: 9, s: 10, unsigned: 8 },
  // EIP-1559: chainId, nonce, maxPriorityFee, maxFee, gas, to, value, data, accessList, v, r, s
  2: { to: 5, data: 7, v: 9, r: 10, s: 11, unsigned: 9 },
  // EIP-4844: EIP-1559 plus maxFeePerBlobGas and blobVersionedHashes
  3: { to: 5, data: 7, v: 11, r: 12, s: 13, unsigned: 11 },
};

function u8aToBigInt(u8a) {
  let value = 0n;
  for (const byte of u8a) {
    value = (value << 8n) | BigInt(byte);
  }
  return value;
}

function bigIntToU8a(value) {
  if (value === 0n) {
    return new Uint8Array(0);
  }

  const bytes = [];
  let left = value;
  while (left > 0n) {
    bytes.unshift(Number(left & 0xffn));
    left >>= 8n;
  }
  return Uint8Array.from(bytes);
}

function decodeLength(u8a, position, lengthOfLength) {
  let length = 0n;
  for (let i = 0; i < lengthOfLength; i++) {
    length = (length << 8n) | BigInt(u8a[position + i]);
  }
  return Number(length);
}

function rlpDecodeItem(u8a, position) {
  const prefix = u8a[position];

  if (prefix <= 0x7f) {
    return [u8a.subarray(position, position + 1), position + 1];
  }

  if (prefix <= RLP_LONG_STRING_OFFSET) {
    const length = prefix - 0x80;
    const start = position + 1;
    return [u8a.subarray(start, start + length), start + length];
  }

  if (prefix < RLP_SHORT_LIST_OFFSET) {
    const lengthOfLength = prefix - RLP_LONG_STRING_OFFSET;
    const length = decodeLength(u8a, position + 1, lengthOfLength);
    const start = position + 1 + lengthOfLength;
    return [u8a.subarray(start, start + length), start + length];
  }

  let start = position + 1;
  let length = prefix - RLP_SHORT_LIST_OFFSET;
  if (prefix > RLP_LONG_LIST_OFFSET) {
    const lengthOfLength = prefix - RLP_LONG_LIST_OFFSET;
    length = decodeLength(u8a, position + 1, lengthOfLength);
    start = position + 1 + lengthOfLength;
  }

  const end = start + length;
  const list = [];
  let cursor = start;
  while (cursor < end) {
    const [item, next] = rlpDecodeItem(u8a, cursor);
    list.push(item);
    cursor = next;
  }

  return [list, end];
}

function rlpDecode(u8a) {
  if (!u8a || u8a.length <= 0) {
    throw new Error("Can not RLP decode empty data");
  }

  return rlpDecodeItem(u8a, 0)[0];
}

function encodeLength(length, offset) {
  if (length <= RLP_SHORT_STRING_LIMIT) {
    return Uint8Array.from([offset + length]);
  }

  const lengthBytes = bigIntToU8a(BigInt(length));
  return Uint8Array.from([
    offset + RLP_SHORT_STRING_LIMIT + lengthBytes.length,
    ...lengthBytes,
  ]);
}

function rlpEncode(value) {
  if (Array.isArray(value)) {
    const body = Buffer.concat(value.map(rlpEncode));
    return u8aConcat(encodeLength(body.length, RLP_SHORT_LIST_OFFSET), body);
  }

  if (!(value instanceof Uint8Array)) {
    throw new Error(`Can not RLP encode ${typeof value}, Uint8Array expected`);
  }

  const u8a = Uint8Array.from(value);
  if (u8a.length === 1 && u8a[0] <= 0x7f) {
    return u8a;
  }

  return u8aConcat(encodeLength(u8a.length, 0x80), u8a);
}

function toFixed32(u8a) {
  if (u8a.length >= 32) {
    return Uint8Array.from(u8a.subarray(u8a.length - 32));
  }

  const padded = new Uint8Array(32);
  padded.set(u8a, 32 - u8a.length);
  return padded;
}

// The signing hash of a typed transaction is computed over the type byte followed by the
// RLP encoded fields which are not part of the signature. A legacy transaction uses the
// plain fields, with the chain id appended for EIP-155 when the chain id is known.
function signingPayload(type, fields, layout, isLegacy, chainId) {
  let signingFields = fields.slice(0, layout.unsigned);
  if (isLegacy) {
    if (chainId === undefined) {
      return rlpEncode(signingFields);
    }

    signingFields = [
      ...signingFields,
      bigIntToU8a(chainId),
      new Uint8Array(0),
      new Uint8Array(0),
    ];
    return rlpEncode(signingFields);
  }

  return u8aConcat(Uint8Array.from([type]), rlpEncode(signingFields));
}

function recoverSender(type, fields, layout, isLegacy) {
  const v = u8aToBigInt(fields[layout.v] || new Uint8Array(0));

  let recovery;
  let chainId;
  // EIP-155 encodes the chain id and the recovery id in v, while a pre EIP-155
  // transaction keeps the recovery id itself.
  if (isLegacy && v >= 35n) {
    chainId = (v - 35n) / 2n;
    recovery = Number((v - 35n) % 2n);
  } else {
    recovery = Number(v);
  }

  if (recovery !== 0 && recovery !== 1) {
    return null;
  }

  const payload = signingPayload(type, fields, layout, isLegacy, chainId);
  const signature = u8aConcat(
    toFixed32(fields[layout.r]),
    toFixed32(fields[layout.s]),
  );
  const publicKey = secp256k1Recover(
    keccakAsU8a(payload),
    signature,
    recovery,
    "keccak",
  );

  return u8aToHex(keccakAsU8a(publicKey).subarray(12));
}

function parseEthereumTransaction(payload) {
  if (!payload || payload.length < 1) {
    throw new Error("Can not parse empty ethereum transaction");
  }

  const type = payload[0];
  const isTyped = type <= MAX_TYPED_TRANSACTION_TYPE;
  const txType = isTyped ? type : 0;
  const layout = TRANSACTION_LAYOUTS[txType];
  if (!layout) {
    throw new Error(`Unsupported ethereum transaction type ${payload[0]}`);
  }

  const fields = isTyped ? rlpDecode(payload.subarray(1)) : rlpDecode(payload);
  if (!Array.isArray(fields) || fields.length <= layout.data) {
    throw new Error(
      `Unexpected ethereum transaction fields for type ${payload[0]}: ${fields?.length}`,
    );
  }

  const toField = fields[layout.to];
  let sender = null;
  try {
    sender = recoverSender(txType, fields, layout, !isTyped);
  } catch (e) {
    sender = null;
  }

  return {
    type: txType,
    sender,
    to: toField && toField.length > 0 ? u8aToHex(toField) : null,
    data: u8aToHex(fields[layout.data] || new Uint8Array(0)),
  };
}

module.exports = {
  rlpDecode,
  rlpEncode,
  parseEthereumTransaction,
};
