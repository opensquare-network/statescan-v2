const { queryBlockHash } = require("../queryBlockHash");
const { getRuntimePallets } = require("../queryRuntimePallets");
const {
  test: { setPolkadot, disconnect },
} = require("@osn/scan-common");
jest.setTimeout(3000000);

describe("Query runtime pallets", () => {
  beforeAll(async () => {
    await setPolkadot();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("at 10000000 works", async () => {
    const blockHash = await queryBlockHash(10000000);
    const pallets = await getRuntimePallets(blockHash);
  });
});
