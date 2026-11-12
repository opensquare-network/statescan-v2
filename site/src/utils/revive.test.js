/**
 * @jest-environment node
 */
import { parseAbi, serializeTransaction } from "viem";
import {
  decodeEvmCalldata,
  formatEvmArgValue,
  getContractName,
  getEvmCallTableData,
  isReviveCall,
  isReviveEthTransact,
  parseEvmTransaction,
  parseReviveCall,
  parseReviveEthTransact,
  setVerifiedContracts,
} from "./revive";

const WRAPPED_DOT = "0xaf905e66038ece89e03d843b35a11d262053b630";

const VIBE_PAIR = "0xd1ca19e67da8737c691bb0a1d8bc12e538c7b4f2";

const SONE_VIBE_WRAPPED_XC20 = "0xbee14ad0949ebb63b90e04b8fd0a78af2f0f3354";

const OMNI_BONDING_CURVE_PROXY = "0x132c64a7a8c2b85cda7f4ce46587243740b39fba";

const OMNI_BONDING_CURVE_IMPLEMENTATION =
  "0x93afe9ac0bdaac89a7045e5451b3de6d3f1210d6";

const TEST_CONTRACTS = [
  {
    address: WRAPPED_DOT,
    name: "WrappedDOT",
    abi: parseAbi([
      "function deposit()",
      "function withdraw(uint256 amount)",
      "function approve(address spender, uint256 value)",
    ]),
  },
  {
    address: VIBE_PAIR,
    name: "VibePair",
    abi: parseAbi([
      "function swap(uint256 amount0Out, uint256 amount1Out, address to, bytes data)",
      "function sync()",
    ]),
  },
  {
    address: SONE_VIBE_WRAPPED_XC20,
    name: "SoneVibeWrappedXC20",
    abi: parseAbi([
      "function deposit(uint256 amount)",
      "function withdraw(uint256 amount)",
    ]),
  },
  {
    address: OMNI_BONDING_CURVE_IMPLEMENTATION,
    name: "OmniBondingCurve",
    abi: parseAbi([
      "function buy(uint256 tokenId, uint256 quoteAmount, uint256 minTokenOut, bytes32 referralCode)",
      "function createTokenDirect((string name, string symbol, bytes extraData) tokenInfo, address quoteToken, bytes32 referralCode, uint256 ignitionAmount, uint256 minTokenOut, uint32 launcherId)",
    ]),
  },
  {
    address: OMNI_BONDING_CURVE_PROXY,
    name: "ERC1967Proxy",
    abi: parseAbi(["function upgradeTo(address newImplementation)"]),
    implementations: [{ address: OMNI_BONDING_CURVE_IMPLEMENTATION }],
  },
];

beforeAll(() => {
  setVerifiedContracts(TEST_CONTRACTS);
});

const OMNI_BUY_DATA =
  "0x4aaf6fa40000000000000000000000000000000000000000000000000000000000000002" +
  "0000000000000000000000000000000000000000000000008ac7230489e80000" +
  "0000000000000000000000000000000000000000000002358df62bff289fbf89de" +
  "0000000000000000000000000000000000000000000000000000000000000000";

// createTokenDirect((string,string,bytes),address,bytes32,uint256,uint256,uint32)
// of the OmniBondingCurve proxy, a token named 牛来 with the NIULAI symbol.
const OMNI_CREATE_TOKEN_DATA =
  "0x964c9eb700000000000000000000000000000000000000000000000000000000000000c0" +
  "0000000000000000000000000000000000000000000000000000000000000000".repeat(5) +
  "0000000000000000000000000000000000000000000000000000000000000060" +
  "00000000000000000000000000000000000000000000000000000000000000a0" +
  "00000000000000000000000000000000000000000000000000000000000000e0" +
  "0000000000000000000000000000000000000000000000000000000000000006" +
  "e7899be69da50000000000000000000000000000000000000000000000000000" +
  "0000000000000000000000000000000000000000000000000000000000000006" +
  "4e49554c41490000000000000000000000000000000000000000000000000000" +
  "00000000000000000000000000000000000000000000000000000000000000a9" +
  "7b2276223a312c22696d616765223a2268747470733a2f2f746a6c7331336964" +
  "316f7032316763692e7075626c69632e626c6f622e76657263656c2d73746f72" +
  "6167652e636f6d2f31306135356366342d663332662d346436642d393164322d" +
  "3730346339343163383031622d5544426b766f6e5a344973414b316131734b70" +
  "78636a74397575564a734b2e77656270222c226272616e64436f6c6f72223a22" +
  "23663662633332227d0000000000000000000000000000000000000000000000";

const UNKNOWN_CONTRACT = "0x1111111111111111111111111111111111111111";

const WITHDRAW_DATA =
  "0x2e1a7d4d000000000000000000000000000000000000000000000000000000000008d50e";

const APPROVE_DATA =
  "0x095ea7b3000000000000000000000000351acc8046a29dedd9c58753cf886ceac441c7f7000000000000000000000000000000000000000000000000000003a352944000";

const reviveCall = {
  section: "revive",
  method: "call",
  args: [
    {
      name: "dest",
      type: "H160",
      value: "0x0000003400000000000000000000000002200000",
    },
    { name: "value", type: "BalanceOf", value: "0" },
    {
      name: "weightLimit",
      type: "Weight",
      value: { refTime: 346565700, proofSize: 16584 },
    },
    { name: "storageDepositLimit", type: "BalanceOf", value: "100000000" },
    { name: "data", type: "Bytes", value: APPROVE_DATA },
  ],
};

describe("revive call parsing", () => {
  test("detects revive.call only", () => {
    expect(isReviveCall(reviveCall)).toBe(true);
    expect(isReviveCall({ section: "balances", method: "transfer" })).toBe(
      false,
    );
    expect(
      parseReviveCall({ section: "balances", method: "transfer" }),
    ).toBeNull();
  });

  test("extracts dest and calldata from args", () => {
    const parsed = parseReviveCall(reviveCall);

    expect(parsed.dest).toBe("0x0000003400000000000000000000000002200000");
    expect(parsed.calldata.functionName).toBe("approve");
    expect(parsed.calldata.signature).toBe("approve(address,uint256)");
  });

  test("decodes ERC-20 approve calldata", () => {
    const decoded = decodeEvmCalldata(APPROVE_DATA);

    expect(decoded.args[0].toLowerCase()).toBe(
      "0x351acc8046a29dedd9c58753cf886ceac441c7f7",
    );
    expect(decoded.args[1].toString()).toBe("4000000000000");
  });

  test("decodes WrappedDOT deposit()", () => {
    const decoded = decodeEvmCalldata("0xd0e30db0", WRAPPED_DOT);

    expect(decoded.signature).toBe("deposit()");
    expect(decoded.args).toEqual([]);
  });

  test("decodes WrappedDOT withdraw(uint256)", () => {
    const decoded = decodeEvmCalldata(WITHDRAW_DATA, WRAPPED_DOT);

    expect(decoded.signature).toBe("withdraw(uint256)");
    expect(decoded.args[0].toString()).toBe("578830");
    expect(decoded.inputs[0].name).toBe("amount");
  });

  test("decodes WrappedDOT approve with its own parameter names", () => {
    const decoded = decodeEvmCalldata(APPROVE_DATA, WRAPPED_DOT);

    expect(decoded.signature).toBe("approve(address,uint256)");
    expect(decoded.inputs.map((input) => input.name)).toEqual([
      "spender",
      "value",
    ]);
  });

  test("keeps the generic ABI for unknown contracts", () => {
    const transferData = `0xa9059cbb${APPROVE_DATA.slice(10)}`;
    const decoded = decodeEvmCalldata(transferData, UNKNOWN_CONTRACT);

    expect(decoded.signature).toBe("transfer(address,uint256)");
    expect(decoded.inputs.map((input) => input.name)).toEqual(["to", "amount"]);
  });

  test("decodes a known selector even when the callee has no abi", () => {
    const decoded = decodeEvmCalldata(WITHDRAW_DATA, UNKNOWN_CONTRACT);

    expect(decoded.signature).toBe("withdraw(uint256)");
  });

  test("decodes ERC-1363 transferAndCall", () => {
    const decoded = decodeEvmCalldata(
      `0x1296ee62${"0".repeat(
        24,
      )}d1ca19e67da8737c691bb0a1d8bc12e538c7b4f2${"0".repeat(63)}5`,
    );

    expect(decoded.signature).toBe("transferAndCall(address,uint256)");
    expect(decoded.args[0].toLowerCase()).toBe(
      "0xd1ca19e67da8737c691bb0a1d8bc12e538c7b4f2",
    );
    expect(decoded.args[1].toString()).toBe("5");
  });

  test("decodes ERC-1363 transferAndCall with data", () => {
    const decoded = decodeEvmCalldata(
      "0x4000aea0" +
        "0".repeat(24) +
        "d1ca19e67da8737c691bb0a1d8bc12e538c7b4f2" +
        "0".repeat(63) +
        "5" +
        "0".repeat(62) +
        "60" +
        "0".repeat(63) +
        "4" +
        "deadbeef" +
        "0".repeat(56),
    );

    expect(decoded.signature).toBe("transferAndCall(address,uint256,bytes)");
    expect(decoded.args[1].toString()).toBe("5");
    expect(decoded.args[2]).toBe("0xdeadbeef");
  });

  test("decodes ERC-1363 transferFromAndCall", () => {
    const decoded = decodeEvmCalldata(
      "0xd8fbe994" +
        "0".repeat(24) +
        "af905e66038ece89e03d843b35a11d262053b630" +
        "0".repeat(24) +
        "d1ca19e67da8737c691bb0a1d8bc12e538c7b4f2" +
        "0".repeat(63) +
        "7",
    );

    expect(decoded.signature).toBe(
      "transferFromAndCall(address,address,uint256)",
    );
    expect(decoded.args[2].toString()).toBe("7");
  });

  test("decodes VibePair swap", () => {
    const decoded = decodeEvmCalldata(
      "0x022c0d9f" +
        "0".repeat(64) +
        "0".repeat(58) +
        "08d50e" +
        "0".repeat(24) +
        "f756e2e7f9546cfae459c8016f9976cbe15fb656" +
        "0".repeat(62) +
        "80" +
        "0".repeat(64),
      VIBE_PAIR,
    );

    expect(decoded.signature).toBe("swap(uint256,uint256,address,bytes)");
    expect(decoded.inputs.map((input) => input.name)).toEqual([
      "amount0Out",
      "amount1Out",
      "to",
      "data",
    ]);
    expect(decoded.args[1].toString()).toBe("578830");
  });

  test("decodes VibePair sync", () => {
    const decoded = decodeEvmCalldata("0xfff6cae9", VIBE_PAIR);

    expect(decoded.signature).toBe("sync()");
    expect(decoded.args).toEqual([]);
  });

  test("decodes SoneVibeWrappedXC20 deposit with amount", () => {
    const decoded = decodeEvmCalldata(
      `0xb6b55f25${"0".repeat(63)}a`,
      SONE_VIBE_WRAPPED_XC20,
    );

    expect(decoded.signature).toBe("deposit(uint256)");
    expect(decoded.inputs[0].name).toBe("amount");
    expect(decoded.args[0].toString()).toBe("10");
  });

  test("decodes SoneVibeWrappedXC20 deposit(uint256) and withdraw", () => {
    const withdraw = decodeEvmCalldata(WITHDRAW_DATA, SONE_VIBE_WRAPPED_XC20);
    expect(withdraw.signature).toBe("withdraw(uint256)");
    expect(withdraw.inputs[0].name).toBe("amount");
    expect(withdraw.args[0].toString()).toBe("578830");

    const deposit = decodeEvmCalldata(
      `0xb6b55f25${"0".repeat(63)}a`,
      SONE_VIBE_WRAPPED_XC20,
    );
    expect(deposit.signature).toBe("deposit(uint256)");
    expect(deposit.args[0].toString()).toBe("10");
  });

  test("resolves contract names case insensitively", () => {
    expect(getContractName(WRAPPED_DOT)).toBe("WrappedDOT");
    expect(getContractName(WRAPPED_DOT.toUpperCase())).toBe("WrappedDOT");
    expect(getContractName(VIBE_PAIR)).toBe("VibePair");
    expect(getContractName(UNKNOWN_CONTRACT)).toBeNull();
    expect(getContractName(undefined)).toBeNull();
  });

  test("decodes the calls of the OmniBondingCurve proxy", () => {
    expect(getContractName(OMNI_BONDING_CURVE_PROXY)).toBe("OmniBondingCurve");

    const decoded = decodeEvmCalldata(OMNI_BUY_DATA, OMNI_BONDING_CURVE_PROXY);

    expect(decoded.signature).toBe("buy(uint256,uint256,uint256,bytes32)");
    expect(decoded.inputs.map((input) => input.name)).toEqual([
      "tokenId",
      "quoteAmount",
      "minTokenOut",
      "referralCode",
    ]);
    expect(decoded.args[0].toString()).toBe("2");
    expect(decoded.args[1].toString()).toBe("10000000000000000000");
  });

  test("decodes and prints the tuple of a createTokenDirect call", () => {
    const decoded = decodeEvmCalldata(
      OMNI_CREATE_TOKEN_DATA,
      OMNI_BONDING_CURVE_PROXY,
    );

    expect(decoded.signature).toBe(
      "createTokenDirect((string,string,bytes),address,bytes32,uint256,uint256,uint32)",
    );

    const [tokenInfo] = decoded.inputs;
    const printed = formatEvmArgValue(
      decoded.args[0],
      tokenInfo.type,
      tokenInfo.components,
    );
    expect(printed).toContain("name: 牛来");
    expect(printed).toContain("symbol: NIULAI");
    expect(printed).toContain("extraData: 0x7b2276223a312c");
  });

  test("falls back to the selector for unknown calldata", () => {
    const decoded = decodeEvmCalldata(`0xdeadbeef${"00".repeat(32)}`);

    expect(decoded.selector).toBe("0xdeadbeef");
    expect(decoded.functionName).toBeNull();
  });

  test("handles empty calldata", () => {
    const decoded = decodeEvmCalldata("0x");

    expect(decoded.selector).toBeNull();
    expect(decoded.args).toEqual([]);
  });

  test("resolves args by position when names are missing", () => {
    const parsed = parseReviveCall({
      section: "revive",
      method: "call",
      args: [
        { value: "0xabc" },
        { value: "1" },
        {},
        {},
        { value: APPROVE_DATA },
      ],
    });

    expect(parsed.dest).toBe("0xabc");
    expect(parsed.calldata.functionName).toBe("approve");
  });
});

describe("evm argument formatting", () => {
  test("prints bigints as plain numbers", () => {
    expect(formatEvmArgValue(578830n, "uint256")).toBe("578830");
  });

  test("lower cases addresses", () => {
    expect(formatEvmArgValue(`0x${"A".repeat(40)}`, "address")).toBe(
      `0x${"a".repeat(40)}`,
    );
  });

  test("keeps other values as they are", () => {
    expect(formatEvmArgValue(true, "bool")).toBe("true");
    expect(formatEvmArgValue("0xdeadbeef", "bytes")).toBe("0xdeadbeef");
  });

  test("prints arrays element by element", () => {
    expect(formatEvmArgValue([1n, 2n], "uint256[]")).toBe("[1, 2]");
    expect(formatEvmArgValue([[1n], [2n]], "uint256[][]")).toBe("[[1], [2]]");
    expect(formatEvmArgValue([`0x${"A".repeat(40)}`], "address[]")).toBe(
      `[0x${"a".repeat(40)}]`,
    );
  });

  test("prints tuples field by field", () => {
    const components = [
      { name: "name", type: "string" },
      { name: "amount", type: "uint256" },
      { name: "owner", type: "address" },
    ];

    expect(
      formatEvmArgValue(
        { name: "Token", amount: 5n, owner: `0x${"A".repeat(40)}` },
        "tuple",
        components,
      ),
    ).toBe(`{ name: Token, amount: 5, owner: 0x${"a".repeat(40)} }`);
  });

  test("marks missing values", () => {
    expect(formatEvmArgValue(undefined, "uint256")).toBe("--");
  });
});

describe("calldata table data", () => {
  const rowsOf = (data) => data.object_data;

  test("shows the method and a nested table of its parameters", () => {
    const data = getEvmCallTableData(
      decodeEvmCalldata(APPROVE_DATA, WRAPPED_DOT),
    );
    const rows = rowsOf(data);

    expect(data.object_type).toBe("table_pairs");
    expect(rows[0]).toEqual(["method", "approve(address,uint256)"]);
    expect(rows[1][0]).toBe("parameters");
    expect(rowsOf(rows[1][1])).toEqual([
      ["spender", "0x351acc8046a29dedd9c58753cf886ceac441c7f7"],
      ["value", "4000000000000"],
    ]);
  });

  test("keeps the method alone when it has no parameter", () => {
    const data = getEvmCallTableData(
      decodeEvmCalldata("0xd0e30db0", WRAPPED_DOT),
    );

    expect(rowsOf(data)).toEqual([["method", "deposit()"]]);
  });

  test("falls back to the selector and the raw data of an unknown method", () => {
    const unknownData = `0xdeadbeef${"00".repeat(32)}`;
    const data = getEvmCallTableData(
      decodeEvmCalldata(unknownData, UNKNOWN_CONTRACT),
    );

    expect(rowsOf(data)).toEqual([
      ["method", "0xdeadbeef"],
      ["data", unknownData],
    ]);
  });

  test("has no method nor data without calldata", () => {
    expect(rowsOf(getEvmCallTableData(decodeEvmCalldata("0x")))).toEqual([
      ["method", "--"],
    ]);
  });
});

describe("revive ethTransact parsing", () => {
  const signature = {
    r: `0x${"11".repeat(32)}`,
    s: `0x${"22".repeat(32)}`,
    yParity: 0,
  };

  const legacySignature = { ...signature, v: 27n };

  const serialize = (transaction) =>
    serializeTransaction(
      {
        chainId: 420420417,
        nonce: 3,
        maxPriorityFeePerGas: 1000000n,
        maxFeePerGas: 1000000000n,
        gas: 100000n,
        value: 0n,
        type: "eip1559",
        ...transaction,
      },
      signature,
    );

  const ethTransactCall = (payload) => ({
    section: "revive",
    method: "ethTransact",
    args: [{ name: "payload", type: "Bytes", value: payload }],
  });

  test("detects revive.ethTransact only", () => {
    const call = ethTransactCall(serialize({ to: WRAPPED_DOT }));

    expect(isReviveEthTransact(call)).toBe(true);
    expect(isReviveEthTransact({ section: "revive", method: "call" })).toBe(
      false,
    );
    expect(parseReviveEthTransact({ section: "revive", method: "call" })).toBe(
      null,
    );
  });

  test("decodes the ethereum transaction of the payload", () => {
    const payload = serialize({ to: WRAPPED_DOT, data: WITHDRAW_DATA });
    const transaction = parseEvmTransaction(payload);

    expect(transaction.to).toBe(WRAPPED_DOT);
    expect(transaction.data).toBe(WITHDRAW_DATA);
    expect(transaction.value).toBe(0n);
  });

  test("decodes the call the payload makes", () => {
    const parsed = parseReviveEthTransact(
      ethTransactCall(serialize({ to: WRAPPED_DOT, data: WITHDRAW_DATA })),
    );

    expect(parsed.dest).toBe(WRAPPED_DOT);
    expect(parsed.calldata.functionName).toBe("withdraw");
    expect(parsed.calldata.signature).toBe("withdraw(uint256)");
    expect(parsed.calldata.args[0].toString()).toBe("578830");
  });

  test("keeps the value of the ethereum transaction", () => {
    const parsed = parseReviveEthTransact(
      ethTransactCall(
        serialize({ to: WRAPPED_DOT, data: "0xd0e30db0", value: 123n }),
      ),
    );

    expect(parsed.value).toBe(123n);
    expect(parsed.calldata.signature).toBe("deposit()");
  });

  test("decodes legacy ethereum transactions as well", () => {
    const payload = serializeTransaction(
      {
        chainId: 420420417,
        nonce: 1,
        gasPrice: 1000000000n,
        gas: 100000n,
        to: WRAPPED_DOT,
        data: WITHDRAW_DATA,
      },
      legacySignature,
    );

    expect(
      parseReviveEthTransact(ethTransactCall(payload)).calldata.signature,
    ).toBe("withdraw(uint256)");
  });

  test("keeps the selector of an unknown method", () => {
    const unknownData = `0xdeadbeef${"00".repeat(32)}`;
    const parsed = parseReviveEthTransact(
      ethTransactCall(serialize({ to: UNKNOWN_CONTRACT, data: unknownData })),
    );

    expect(parsed.dest).toBe(UNKNOWN_CONTRACT);
    expect(parsed.calldata.functionName).toBeNull();
    expect(parsed.calldata.selector).toBe("0xdeadbeef");
  });

  test("has no destination when the transaction deploys a contract", () => {
    const parsed = parseReviveEthTransact(
      ethTransactCall(serialize({ data: "0x6080604052" })),
    );

    expect(parsed.dest).toBeNull();
    expect(parsed.calldata.functionName).toBeNull();
  });

  test("leaves an unparsable payload undecoded", () => {
    expect(parseEvmTransaction("0x1234")).toBeNull();
    expect(parseEvmTransaction(undefined)).toBeNull();
    expect(parseReviveEthTransact(ethTransactCall("0x1234"))).toBeNull();
  });

  test("reads a payload argument without a name", () => {
    const payload = serialize({ to: WRAPPED_DOT, data: WITHDRAW_DATA });
    const parsed = parseReviveEthTransact({
      section: "revive",
      method: "ethTransact",
      args: [{ value: payload }],
    });

    expect(parsed.calldata.functionName).toBe("withdraw");
  });
});
