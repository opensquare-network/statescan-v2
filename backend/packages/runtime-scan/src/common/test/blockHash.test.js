const { queryBlockHash } = require("../queryBlockHash");
const {
  test: { setPolkadot, disconnect },
} = require("@osn/scan-common");
jest.setTimeout(3000000);

describe("Query block hash", () => {
  beforeAll(async () => {
    await setPolkadot();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("of 100 works", async () => {
    const hash = await queryBlockHash(100);
    expect(hash).toEqual(
      "0xedf9246b378fe4aa1c29d21c64b0bf9880553690ce6cd956c18c03310e49fa5f",
    );
  });
});
