const { populateSubAccounts } = require("../accounts");
const {
  chain: { getApi },
  test: { setPolkadot, disconnect },
} = require("@osn/scan-common");
jest.setTimeout(3000000);

describe("Identity", () => {
  beforeAll(async () => {
    await setPolkadot();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("populating sub accounts works", async () => {
    const api = await getApi();
    const blockHeight = 16044900;
    const blockHash = await api.rpc.chain.getBlockHash(blockHeight);
    const indexer = { blockHeight, blockHash };

    const accounts = [
      "16SDAKg9N6kKAbhgDyxBXdHEwpwHUHs2CNEiLNGeZV55qHna",
      "12sNU8BXivMj1xQmcd4T39ugCyHjmhir8jkPqfAw5ZDESrx4",
    ];

    const populated = await populateSubAccounts(accounts, indexer);
    expect(populated).toEqual([
      "16SDAKg9N6kKAbhgDyxBXdHEwpwHUHs2CNEiLNGeZV55qHna",
      "12sNU8BXivMj1xQmcd4T39ugCyHjmhir8jkPqfAw5ZDESrx4",
      "12ZGvKApnos8M3rzmjRQ8me9ycTuzhe4zxAte5WCdcq4ZK31",
      "13RDY9nrJpyTDBSUdBw12dGwhk19sGwsrVZ2bxkzYHBSagP2",
    ]);
  });
});
