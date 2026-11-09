/**
 * @jest-environment node
 */
import {
  decodeEvmCalldata,
  getContractName,
  isReviveCall,
  parseReviveCall,
} from "./revive";

const WRAPPED_DOT = "0xaf905e66038ece89e03d843b35a11d262053b630";

const VIBE_PAIR = "0xd1ca19e67da8737c691bb0a1d8bc12e538c7b4f2";

const SONE_VIBE_WRAPPED_XC20 = "0xbee14ad0949ebb63b90e04b8fd0a78af2f0f3354";

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

  test("leaves methods of unknown contracts undecoded", () => {
    const decoded = decodeEvmCalldata(WITHDRAW_DATA, UNKNOWN_CONTRACT);

    expect(decoded.selector).toBe("0x2e1a7d4d");
    expect(decoded.functionName).toBeNull();
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

  test("decodes SoneVibeWrappedXC20 withdraw and keeps deposit() unknown", () => {
    const withdraw = decodeEvmCalldata(WITHDRAW_DATA, SONE_VIBE_WRAPPED_XC20);
    expect(withdraw.signature).toBe("withdraw(uint256)");
    expect(withdraw.inputs[0].name).toBe("amount");
    expect(withdraw.args[0].toString()).toBe("578830");

    const deposit = decodeEvmCalldata("0xd0e30db0", SONE_VIBE_WRAPPED_XC20);
    expect(deposit.functionName).toBeNull();
  });

  test("resolves contract names case insensitively", () => {
    expect(getContractName(WRAPPED_DOT)).toBe("WrappedDOT");
    expect(getContractName(WRAPPED_DOT.toUpperCase())).toBe("WrappedDOT");
    expect(getContractName(VIBE_PAIR)).toBe("VibePair");
    expect(getContractName(UNKNOWN_CONTRACT)).toBeNull();
    expect(getContractName(undefined)).toBeNull();
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
