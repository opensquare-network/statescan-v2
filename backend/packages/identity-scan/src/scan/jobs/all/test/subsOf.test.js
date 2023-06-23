const { getSubsOfMap } = require("../subsOf");
const {
  chain: { getApi },
  test: { setPolkadot, disconnect },
} = require("@osn/scan-common");
jest.setTimeout(3000000);

describe("Query identity subsOf", () => {
  beforeAll(async () => {
    await setPolkadot();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("entries map works", async () => {
    const api = await getApi();
    const blockHeight = 16044900;
    const blockHash = await api.rpc.chain.getBlockHash(blockHeight);

    const map = await getSubsOfMap({ blockHeight, blockHash });
    const address = "16SDAKg9N6kKAbhgDyxBXdHEwpwHUHs2CNEiLNGeZV55qHna";
    expect(map[address]).toEqual({
      deposit: "401060000000",
      accounts: [
        "12ZGvKApnos8M3rzmjRQ8me9ycTuzhe4zxAte5WCdcq4ZK31",
        "13RDY9nrJpyTDBSUdBw12dGwhk19sGwsrVZ2bxkzYHBSagP2",
      ],
    });
  });
});
