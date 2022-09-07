const {
  test: { setPolkadot, disconnect }
} = require("@osn/scan-common")
const { getOnChainAccounts } = require("../getOnChainAccounts");
jest.setTimeout(3000000);

describe("Query accounts", () => {
  beforeAll(async () => {
    await setPolkadot();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("works", async () => {
    const account = "13UVJyLnbVp9RBZYFwFGyDvVd1y27Tt8tkntv6Q7JVPhFsTB";
    const accounts = await getOnChainAccounts([account]);
    expect(accounts).toHaveLength(1);
  })
})
