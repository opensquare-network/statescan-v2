const { queryInstanceMetadata } = require("../metadata");
const {
  chain: { disconnect, getApi },
} = require("@osn/scan-common");
const {
  test: { setStatemine },
} = require("@statescan/common");
jest.setTimeout(3000000);

describe("Query instance metadata", () => {
  beforeAll(async () => {
    await setStatemine();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("works", async () => {
    const height = 1042231;
    const api = await getApi();
    const blockHash = await api.rpc.chain.getBlockHash(height);

    const details = await queryInstanceMetadata(11, 67, blockHash);
    expect(details).toEqual({
      deposit: 6724999350,
      data: "0x516d5831687865414a644a7a336f4d6d6a6851435346424276395233517a455a5361676659443369434e4d526252",
      isFrozen: false,
    });
  });
});
