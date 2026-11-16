/**
 * @jest-environment node
 */
import {
  formatEvmAddress,
  isEvmAddress,
  normalizeEvmAddress,
} from "./reviveAddress";

const EVM_ADDRESS = "0xd1ca19e67da8737c691bb0a1d8bc12e538c7b4f2";

describe("revive EVM addresses", () => {
  test("detects and normalizes EVM addresses", () => {
    expect(isEvmAddress(EVM_ADDRESS)).toBe(true);
    expect(isEvmAddress(EVM_ADDRESS.toUpperCase().replace("0X", "0x"))).toBe(
      true,
    );
    expect(
      isEvmAddress("5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"),
    ).toBe(false);

    expect(
      normalizeEvmAddress(EVM_ADDRESS.toUpperCase().replace("0X", "0x")),
    ).toBe(EVM_ADDRESS);
    expect(normalizeEvmAddress("0x1234")).toBe(null);
  });

  test("formats an EVM address with its checksum", () => {
    expect(formatEvmAddress(EVM_ADDRESS)).toBe(
      "0xD1ca19e67dA8737c691bb0a1D8bC12E538C7b4F2",
    );
  });
});
