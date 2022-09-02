const { queryEntries } = require("../entries");
const {
  test: { setPolkadot, disconnect }
} = require("@osn/scan-common")
jest.setTimeout(3000000);

describe("Query account entries", () => {
  beforeAll(async () => {
    await setPolkadot();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("works", async () => {
    const entries = await queryEntries();
    expect(entries.length).toBeGreaterThan(0);
  })
})
