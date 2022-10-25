const { queryApproval } = require("../approval");
const {
  test: { setStatemine },
} = require("@statescan/common");
const {
  chain: { disconnect, getApi },
} = require("@osn/scan-common");
jest.setTimeout(3000000);

describe("Query ", () => {
  beforeAll(async () => {
    await setStatemine();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("asset approval works", async () => {
    const height = 832151;

    const api = await getApi();
    const blockHash = await api.rpc.chain.getBlockHash(height);

    const approval = await queryApproval(
      blockHash,
      36,
      "FG8u2HSdf5W4HZcXmPDSTMSGifK3ZjzJSxbH6v1qgtSkepq",
      "GDGCzxSoGgwr4UoPQrteKVBkHs7aHjzCPxEA2NS14hKgRXC",
    );
    expect(approval).toEqual({
      amount: 10,
      deposit: 3333333,
    });
  });
});
