const { hexToU8a, u8aToHex } = require("@polkadot/util");
const {
  keccakAsU8a,
  secp256k1Expand,
  secp256k1PairFromSeed,
  secp256k1Sign,
} = require("@polkadot/util-crypto");
const {
  parseEthereumTransaction,
  rlpDecode,
  rlpEncode,
} = require("../ethereum");

const pair = secp256k1PairFromSeed(new Uint8Array(32).fill(7));
const sender = u8aToHex(
  keccakAsU8a(secp256k1Expand(pair.publicKey)).subarray(12),
);

const CHAIN_ID = 420420417n;
const CHAIN_ID_BYTES = hexToU8a("0x190f1b41");
const TO = hexToU8a("0xaf905e66038ece89e03d843b35a11d262053b630");
const DATA = hexToU8a(
  "0xa9059cbb000000000000000000000000d1ca19e67da8737c691bb0a1d8bc12e538c7b4f2",
);
const GAS_PRICE = hexToU8a("0x3b9aca00");
const GAS_LIMIT = hexToU8a("0x0ebfa1");
const EMPTY = new Uint8Array(0);
const ZERO = hexToU8a("0x00");

function toU8a(value) {
  const bytes = [];
  let left = value;
  while (left > 0n) {
    bytes.unshift(Number(left & 0xffn));
    left >>= 8n;
  }
  return Uint8Array.from(bytes);
}

function sign(payload) {
  const signature = secp256k1Sign(payload, pair, "keccak");
  return {
    r: signature.subarray(0, 32),
    s: signature.subarray(32, 64),
    recovery: BigInt(signature[64]),
  };
}

function buildTypedTransaction(type, unsignedFields) {
  const signingPayload = Buffer.concat([
    Buffer.from([type]),
    Buffer.from(rlpEncode(unsignedFields)),
  ]);
  const { r, s, recovery } = sign(signingPayload);

  return u8aToHex(
    Buffer.concat([
      Buffer.from([type]),
      Buffer.from(rlpEncode([...unsignedFields, toU8a(recovery), r, s])),
    ]),
  );
}

function buildLegacyTransaction(fields, chainId) {
  const signingFields = chainId
    ? [...fields, toU8a(chainId), EMPTY, EMPTY]
    : fields;
  const { r, s, recovery } = sign(Buffer.from(rlpEncode(signingFields)));
  const v = chainId ? 35n + chainId * 2n + recovery : recovery;

  return u8aToHex(rlpEncode([...fields, toU8a(v), r, s]));
}

function parse(payload) {
  return parseEthereumTransaction(hexToU8a(payload));
}

describe("RLP", () => {
  test("encode then decode", () => {
    const value = [
      ZERO,
      EMPTY,
      hexToU8a("0x1234"),
      new Uint8Array(60).fill(0xab),
      [ZERO],
    ];
    const decoded = rlpDecode(hexToU8a(u8aToHex(rlpEncode(value))));

    expect(u8aToHex(decoded[0])).toBe("0x00");
    expect(decoded[1].length).toBe(0);
    expect(u8aToHex(decoded[2])).toBe("0x1234");
    expect(decoded[3].length).toBe(60);
    expect(u8aToHex(decoded[4][0])).toBe("0x00");
  });
});

describe("Parse ethereum transaction", () => {
  test("legacy transaction", () => {
    const payload = buildLegacyTransaction([
      ZERO,
      GAS_PRICE,
      GAS_LIMIT,
      TO,
      EMPTY,
      DATA,
    ]);

    const tx = parse(payload);
    expect(tx.type).toBe(0);
    expect(tx.sender).toBe(sender);
    expect(tx.to).toBe(u8aToHex(TO));
    expect(tx.data).toBe(u8aToHex(DATA));
  });

  test("legacy transaction with EIP-155 chain id", () => {
    const payload = buildLegacyTransaction(
      [hexToU8a("0x02"), GAS_PRICE, GAS_LIMIT, TO, EMPTY, DATA],
      CHAIN_ID,
    );

    const tx = parse(payload);
    expect(tx.sender).toBe(sender);
    expect(tx.to).toBe(u8aToHex(TO));
  });

  test("EIP-2930 transaction", () => {
    const payload = buildTypedTransaction(1, [
      CHAIN_ID_BYTES,
      ZERO,
      GAS_PRICE,
      GAS_LIMIT,
      TO,
      EMPTY,
      DATA,
      [],
    ]);

    const tx = parse(payload);
    expect(tx.type).toBe(1);
    expect(tx.sender).toBe(sender);
    expect(tx.to).toBe(u8aToHex(TO));
    expect(tx.data).toBe(u8aToHex(DATA));
  });

  test("EIP-1559 transaction creating a contract", () => {
    const payload = buildTypedTransaction(2, [
      CHAIN_ID_BYTES,
      ZERO,
      GAS_PRICE,
      GAS_PRICE,
      GAS_LIMIT,
      EMPTY,
      EMPTY,
      DATA,
      [],
    ]);

    const tx = parse(payload);
    expect(tx.type).toBe(2);
    expect(tx.sender).toBe(sender);
    expect(tx.to).toBeNull();
    expect(tx.data).toBe(u8aToHex(DATA));
  });

  test("EIP-1559 transaction calling a contract", () => {
    const payload = buildTypedTransaction(2, [
      CHAIN_ID_BYTES,
      hexToU8a("0x01"),
      GAS_PRICE,
      GAS_PRICE,
      GAS_LIMIT,
      TO,
      EMPTY,
      DATA,
      [],
    ]);

    const tx = parse(payload);
    expect(tx.type).toBe(2);
    expect(tx.sender).toBe(sender);
    expect(tx.to).toBe(u8aToHex(TO));
    expect(tx.data).toBe(u8aToHex(DATA));
  });

  test("EIP-4844 transaction", () => {
    const payload = buildTypedTransaction(3, [
      CHAIN_ID_BYTES,
      ZERO,
      GAS_PRICE,
      GAS_PRICE,
      GAS_LIMIT,
      TO,
      EMPTY,
      DATA,
      [],
      hexToU8a("0x01"),
      [],
    ]);

    const tx = parse(payload);
    expect(tx.type).toBe(3);
    expect(tx.sender).toBe(sender);
    expect(tx.to).toBe(u8aToHex(TO));
  });
});
