const { queryMultipleSubsOf } = require("../subsOf");
const { querySubsOf } = require("../subsOf");
const {
  chain: { getApi },
  test: { setPolkadot, disconnect },
} = require("@osn/scan-common");
jest.setTimeout(3000000);

describe("Query identity", () => {
  beforeAll(async () => {
    await setPolkadot();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("subs of gav works", async () => {
    const account = "16SDAKg9N6kKAbhgDyxBXdHEwpwHUHs2CNEiLNGeZV55qHna";
    const api = await getApi();
    const blockHeight = 16044900;
    const blockHash = await api.rpc.chain.getBlockHash(blockHeight);

    const subsOf = await querySubsOf(account, { blockHeight, blockHash });
    expect(subsOf[0].toString()).toEqual("401060000000");
    expect(subsOf[1].toJSON()).toEqual([
      "12ZGvKApnos8M3rzmjRQ8me9ycTuzhe4zxAte5WCdcq4ZK31",
      "13RDY9nrJpyTDBSUdBw12dGwhk19sGwsrVZ2bxkzYHBSagP2",
    ]);
  });

  test("subs of OpenSquare works", async () => {
    const account = "12sNU8BXivMj1xQmcd4T39ugCyHjmhir8jkPqfAw5ZDESrx4";
    const api = await getApi();
    const blockHeight = 16044900;
    const blockHash = await api.rpc.chain.getBlockHash(blockHeight);

    const subsOf = await querySubsOf(account, { blockHeight, blockHash });
    expect(subsOf[0].toString()).toEqual("0");
    expect(subsOf[1].toJSON()).toEqual([]);
  });

  test("multiple subs works", async () => {
    const api = await getApi();
    const blockHeight = 16044900;
    const blockHash = await api.rpc.chain.getBlockHash(blockHeight);

    const subsArr = await queryMultipleSubsOf(
      [
        "16SDAKg9N6kKAbhgDyxBXdHEwpwHUHs2CNEiLNGeZV55qHna",
        "12sNU8BXivMj1xQmcd4T39ugCyHjmhir8jkPqfAw5ZDESrx4",
      ],
      { blockHeight, blockHash },
    );

    expect(subsArr[0][0].toString()).toEqual("401060000000");
    expect(subsArr[1][0].toString()).toEqual("0");
  });
});
