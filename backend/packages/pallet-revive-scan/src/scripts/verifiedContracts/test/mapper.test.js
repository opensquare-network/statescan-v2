const {
  mapContractListItem,
  mapContractDetail,
  sameVerifiedAt,
  normalizeAddress,
} = require("../mapper");

describe("verified contract mapper", () => {
  test("normalizes an address to lower case", () => {
    expect(normalizeAddress("0xF90C1C9529A73F9C33F08E41C5611FA483BA2721")).toBe(
      "0xf90c1c9529a73f9c33f08e41c5611fa483ba2721",
    );
    expect(normalizeAddress("not an address")).toBeNull();
  });

  test("maps a list item", () => {
    const item = mapContractListItem({
      address: {
        hash: "0xF90C1C9529A73F9C33F08E41C5611FA483BA2721",
        name: "WETH9",
        is_verified: true,
      },
      compiler_version: "v0.8.28",
      verified_at: "2026-05-11T13:21:35.364908Z",
    });

    expect(item).toEqual({
      address: "0xf90c1c9529a73f9c33f08e41c5611fa483ba2721",
      name: "WETH9",
      compilerVersion: "v0.8.28",
      verifiedAt: new Date("2026-05-11T13:21:35.364908Z"),
      isVerified: true,
    });
  });

  test("maps a contract detail", () => {
    const doc = mapContractDetail({
      address: { hash: "0xF90C1C9529A73F9C33F08E41C5611FA483BA2721" },
      name: "WETH9",
      compiler_version: "v0.8.28+commit.7893614a",
      language: "solidity",
      evm_version: "prague",
      optimization_enabled: true,
      optimization_runs: 200,
      license_type: "mit",
      is_verified: true,
      is_fully_verified: true,
      is_partially_verified: false,
      certified: false,
      verified_at: "2026-05-11T13:21:35.364908Z",
      source_code: "contract WETH9 {}",
      file_path: "src/WETH9.sol",
      additional_sources: [
        { file_path: "src/Lib.sol", source_code: "library Lib {}" },
      ],
      abi: [{ type: "function", name: "deposit" }],
      constructor_args: null,
      proxy_type: null,
      implementations: [],
      sourcify_repo_url: null,
    });

    expect(doc.address).toBe("0xf90c1c9529a73f9c33f08e41c5611fa483ba2721");
    expect(doc.name).toBe("WETH9");
    expect(doc.compilerVersion).toBe("v0.8.28+commit.7893614a");
    expect(doc.evmVersion).toBe("prague");
    expect(doc.optimizationRuns).toBe(200);
    expect(doc.isFullyVerified).toBe(true);
    expect(doc.verifiedAt).toEqual(new Date("2026-05-11T13:21:35.364908Z"));
    expect(doc.sourceCode).toBe("contract WETH9 {}");
    expect(doc.filePath).toBe("src/WETH9.sol");
    expect(doc.additionalSources).toEqual([
      { filePath: "src/Lib.sol", sourceCode: "library Lib {}" },
    ]);
    expect(doc.abi).toEqual([{ type: "function", name: "deposit" }]);
    expect(doc.source).toBe("blockscout");
  });

  test("falls back to the address of the list item", () => {
    const doc = mapContractDetail(
      { name: "NoAddress" },
      "0x208c305f9d1794461d7069be1003e7e979c38e3f",
    );

    expect(doc.address).toBe("0x208c305f9d1794461d7069be1003e7e979c38e3f");
    expect(doc.additionalSources).toEqual([]);
    expect(doc.implementations).toEqual([]);
  });

  test("handles missing fields", () => {
    const doc = mapContractDetail({
      address: { hash: "0x208c305f9d1794461d7069be1003e7e979c38e3f" },
    });

    expect(doc.name).toBeNull();
    expect(doc.compilerVersion).toBeNull();
    expect(doc.verifiedAt).toBeNull();
    expect(doc.sourceCode).toBeNull();
    expect(doc.abi).toBeNull();
  });

  test("handles an empty detail with a fallback address", () => {
    const doc = mapContractDetail(
      null,
      "0x208c305f9d1794461d7069be1003e7e979c38e3f",
    );

    expect(doc.address).toBe("0x208c305f9d1794461d7069be1003e7e979c38e3f");
    expect(doc.name).toBeNull();
  });

  test("compares verification times", () => {
    expect(
      sameVerifiedAt(
        new Date("2026-05-11T13:21:35.364Z"),
        "2026-05-11T13:21:35.364Z",
      ),
    ).toBe(true);
    expect(sameVerifiedAt(null, null)).toBe(true);
    expect(sameVerifiedAt(new Date("2026-05-11T13:21:35.364Z"), null)).toBe(
      false,
    );
  });
});
