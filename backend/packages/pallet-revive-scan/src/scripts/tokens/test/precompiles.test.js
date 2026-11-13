const { getErc20PrecompileAddress } = require("../precompiles");

describe("precompiles", () => {
  it("derives the erc20 precompile address of an asset", () => {
    // The addresses the chain serves the assets of the pallet-assets at.
    expect(getErc20PrecompileAddress(1337)).toEqual(
      "0x0000053900000000000000000000000001200000",
    );
    expect(getErc20PrecompileAddress(1984)).toEqual(
      "0x000007c000000000000000000000000001200000",
    );
    expect(getErc20PrecompileAddress(50000542)).toEqual(
      "0x02faf29e00000000000000000000000001200000",
    );
    expect(getErc20PrecompileAddress(50000514)).toEqual(
      "0x02faf28200000000000000000000000001200000",
    );
  });

  it("keeps the address twenty bytes long", () => {
    for (const assetId of [0, 1, 65535, 4294967295]) {
      expect(getErc20PrecompileAddress(assetId)).toMatch(/^0x[0-9a-f]{40}$/);
    }
  });
});
