const { queryMetadata } = require("../metadata");
const {
  test: { setStatemine },
} = require("@statescan/common");
const {
  chain: { disconnect, getApi },
} = require("@osn/scan-common");
jest.setTimeout(3000000);

describe("Query", () => {
  beforeAll(async () => {
    await setStatemine();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("metadata works", async () => {
    const height = 408095;

    const api = await getApi();
    const blockHash = await api.rpc.chain.getBlockHash(height);
    const metadata = await queryMetadata(blockHash, 0);
    expect(metadata).toEqual({
      deposit: 6692999670,
      name: "Polkadog",
      symbol: "DOG",
      decimals: 6,
      isFrozen: false,
    });
  });
});
