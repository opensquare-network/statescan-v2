const { querySuperOf } = require("../superOf");
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

  test("super of gav works", async () => {
    const account = "13RDY9nrJpyTDBSUdBw12dGwhk19sGwsrVZ2bxkzYHBSagP2";
    const api = await getApi();
    const blockHeight = 16044900;
    const blockHash = await api.rpc.chain.getBlockHash(blockHeight);

    const superOf = await querySuperOf(account, { blockHeight, blockHash });
    expect(superOf.isSome).toBeTruthy();
    expect(superOf.unwrap()[0].toString()).toEqual(
      "16SDAKg9N6kKAbhgDyxBXdHEwpwHUHs2CNEiLNGeZV55qHna",
    );
    expect(superOf.unwrap()[1].asRaw.toUtf8()).toEqual("🏛 Council 🏛");
  });
});
