const {
  chain: { fetchOneBlockFromNode, getBlockIndexer },
  test: { setPolkadotAssetHub, disconnect },
} = require("@osn/scan-common");
const { normalizeExtrinsics } = require("..");
jest.setTimeout(3000000);

const sectionOf = (extrinsic) => extrinsic.section || extrinsic.call?.section;
const methodOf = (extrinsic) => extrinsic.method || extrinsic.call?.method;

// Polkadot AssetHub general transactions (extrinsic format v5, preamble 0x45) carry no
// top level signature: their transaction extensions authorize them, so polkadot.js
// reports them as not signed. They used to be dropped from the index like the inherents.
describe("normalize extrinsics of", () => {
  beforeAll(async () => {
    await setPolkadotAssetHub();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("block 20498811 keeps its general transaction", async () => {
    const { block, events } = await fetchOneBlockFromNode(20498811, false);
    const { normalizedExtrinsics } = await normalizeExtrinsics(
      block.extrinsics,
      events,
      getBlockIndexer(block),
    );

    const general = normalizedExtrinsics.find(
      (extrinsic) => methodOf(extrinsic) === "forceBatch",
    );
    expect(sectionOf(general)).toEqual("utility");
    expect(general.isSigned).toBe(true);
    expect(general.signer).toEqual(
      "12iqiE5Kb8fHd2io8wpBJ23tR27WVELkNMv5yQWLFe52zaUQ",
    );

    // the two inherents stay out of the index
    expect(normalizedExtrinsics).toHaveLength(1);
  });

  test("block 20502416 keeps its signed v4 transaction", async () => {
    const { block, events } = await fetchOneBlockFromNode(20502416, false);
    const { normalizedExtrinsics } = await normalizeExtrinsics(
      block.extrinsics,
      events,
      getBlockIndexer(block),
    );

    const transferred = normalizedExtrinsics.find(
      (extrinsic) => methodOf(extrinsic) === "transferAllowDeath",
    );
    expect(transferred.isSigned).toBe(true);
    expect(transferred.signer).toEqual(
      "15oe1fbQGHCrHuSPnHG7M1g7FzAbdGWM1seoZHWRt6MbMmfC",
    );
  });
});
