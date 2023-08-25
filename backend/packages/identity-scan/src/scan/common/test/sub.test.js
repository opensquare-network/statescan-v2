const { queryIdentityAsSub } = require("../sub");
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

  test("as sub works", async () => {
    const api = await getApi();
    const blockHeight = 16044900;
    const blockHash = await api.rpc.chain.getBlockHash(blockHeight);

    const account = "13RDY9nrJpyTDBSUdBw12dGwhk19sGwsrVZ2bxkzYHBSagP2";
    const info = await queryIdentityAsSub(account, { blockHeight, blockHash });
    expect(info.fullDisplay).toEqual("🍺 Gav 🥃/🏛 Council 🏛");
    expect(info.subDisplay).toEqual("🏛 Council 🏛");
  });
});
