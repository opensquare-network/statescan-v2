const { queryInstancePrice } = require("../price");
const {
  chain: { disconnect, getApi },
} = require("@osn/scan-common");
const {
  test: { setStatemine },
} = require("@statescan/common");
jest.setTimeout(3000000);

describe("Query instance price", () => {
  beforeAll(async () => {
    await setStatemine();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("works", async () => {
    const height = 3600706;
    const api = await getApi();
    const blockHash = await api.rpc.chain.getBlockHash(height);

    const priceTuple = await queryInstancePrice(2, 788, blockHash);
    expect(priceTuple).toEqual([3860000000000, null]);
  });

  test("null works", async () => {
    const height = 3600706;
    const api = await getApi();
    const blockHash = await api.rpc.chain.getBlockHash(height);

    const priceTuple = await queryInstancePrice(0, 0, blockHash);
    expect(priceTuple).toEqual(null);
  });
});
