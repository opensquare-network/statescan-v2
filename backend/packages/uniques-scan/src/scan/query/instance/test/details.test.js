const { queryInstanceDetails } = require("../details");
const {
  chain: { disconnect, getApi },
} = require("@osn/scan-common");
const {
  test: { setStatemine },
} = require("@statescan/common");
jest.setTimeout(3000000);

describe("Query instance details", () => {
  beforeAll(async () => {
    await setStatemine();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("of 0 works", async () => {
    const height = 1041445;
    const api = await getApi();
    const blockHash = await api.rpc.chain.getBlockHash(height);

    const details = await queryInstanceDetails(0, 0, blockHash);
    expect(details).toEqual({
      owner: "D5pXehjCs7AYwLDQesuw8RQaEVydbHHc11erJKqhmeN7r7x",
      approved: null,
      isFrozen: false,
      deposit: 0,
    });
  });
});
