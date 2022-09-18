const { getMetadata } = require("../queryMetadata");
const {
  test: { setPolkadot, disconnect },
} = require("@osn/scan-common");
jest.setTimeout(3000000);

describe("Query block metadata", () => {
  beforeAll(async () => {
    await setPolkadot();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("at 100 works", async () => {
    const metadata = await getMetadata(100);
    expect(metadata.pallets.length).toEqual(31);
  });
});
