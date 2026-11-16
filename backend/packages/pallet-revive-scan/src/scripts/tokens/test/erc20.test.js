const { hexToU8a } = require("@polkadot/util");
const {
  GETTERS,
  decodeBytes32String,
  decodeDecimals,
  decodeString,
  decodeUint,
  readTokenMetadata,
} = require("../erc20");

// The answer of `name()` of an ERC-20, "X-Crystal Token".
const NAME_ANSWER =
  "0x0000000000000000000000000000000000000000000000000000000000000020" +
  "000000000000000000000000000000000000000000000000000000000000000f" +
  "582d4372797374616c20546f6b656e0000000000000000000000000000000000";
const SYMBOL_ANSWER =
  "0x0000000000000000000000000000000000000000000000000000000000000020" +
  "0000000000000000000000000000000000000000000000000000000000000003" +
  "5843540000000000000000000000000000000000000000000000000000000000";
const DECIMALS_ANSWER =
  "0x0000000000000000000000000000000000000000000000000000000000000012";
const TOTAL_SUPPLY_ANSWER =
  "0x0000000000000000000000000000000000000000022865123b7fdbab9c201661";

function hexToBytes(value) {
  return hexToU8a(value);
}

function mockApi(answers) {
  return {
    call: {
      reviveApi: {
        call: async (origin, address, value, weight, deposit, data) => {
          const answer = answers[data];
          if (!answer) {
            throw new Error(`unexpected getter ${data}`);
          }

          return { toJSON: () => answer };
        },
      },
    },
  };
}

function okExecution(data, flags = 0) {
  return { result: { ok: { flags: { bits: flags }, data } } };
}

const ADDRESS = "0x9b77fa7ad6cff8c9c930168710ea43c0b0d955b8";

describe("erc20", () => {
  it("decodes an abi encoded string", () => {
    expect(decodeString(hexToBytes(NAME_ANSWER))).toEqual("X-Crystal Token");
  });

  it("decodes a string returned in a single word", () => {
    const data = hexToBytes(
      "0x574b534d00000000000000000000000000000000000000000000000000000000",
    );
    expect(decodeBytes32String(data)).toEqual("WKSM");
    expect(decodeString(data)).toEqual("WKSM");
  });

  it("rejects an empty or a truncated answer", () => {
    expect(decodeString(hexToBytes("0x"))).toBeNull();
    expect(decodeString(hexToBytes("0x1234"))).toBeNull();
    expect(
      decodeString(
        hexToBytes(
          "0x0000000000000000000000000000000000000000000000000000000000ffffff" +
            "000000000000000000000000000000000000000000000000000000000000000f",
        ),
      ),
    ).toBeNull();
  });

  it("decodes uint8 decimals and rejects a value beyond the range", () => {
    expect(decodeDecimals(hexToBytes(DECIMALS_ANSWER))).toEqual(18);
    expect(
      decodeDecimals(
        hexToBytes(
          "0x0000000000000000000000000000000000000000000000000000000000000100",
        ),
      ),
    ).toBeNull();
  });

  it("decodes uint256 and rejects a wrong word size", () => {
    expect(decodeUint(hexToBytes(TOTAL_SUPPLY_ANSWER)).toString()).toEqual(
      "667804347770825365761562209",
    );
    expect(decodeUint(hexToBytes("0x0001"))).toBeNull();
  });

  it("reads the metadata of a contract answering the four getters", async () => {
    const api = mockApi({
      [GETTERS.name]: okExecution(NAME_ANSWER),
      [GETTERS.symbol]: okExecution(SYMBOL_ANSWER),
      [GETTERS.decimals]: okExecution(DECIMALS_ANSWER),
      [GETTERS.totalSupply]: okExecution(TOTAL_SUPPLY_ANSWER),
    });

    await expect(readTokenMetadata(api, ADDRESS)).resolves.toEqual({
      name: "X-Crystal Token",
      symbol: "XCT",
      decimals: 18,
      totalSupply: "667804347770825365761562209",
    });
  });

  it("rejects a contract which answers every getter with nothing", async () => {
    const api = mockApi({
      [GETTERS.name]: okExecution("0x"),
      [GETTERS.symbol]: okExecution("0x"),
      [GETTERS.decimals]: okExecution("0x"),
      [GETTERS.totalSupply]: okExecution("0x"),
    });

    await expect(readTokenMetadata(api, ADDRESS)).resolves.toBeNull();
  });

  it("rejects a contract whose getter reverted", async () => {
    const api = mockApi({
      [GETTERS.name]: okExecution(NAME_ANSWER),
      [GETTERS.symbol]: okExecution(SYMBOL_ANSWER),
      [GETTERS.decimals]: okExecution(DECIMALS_ANSWER),
      [GETTERS.totalSupply]: okExecution("0x", 1),
    });

    await expect(readTokenMetadata(api, ADDRESS)).resolves.toBeNull();
  });
});
