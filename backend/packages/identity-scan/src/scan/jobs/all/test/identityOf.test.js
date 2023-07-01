const { getIdentityMap } = require("../identityOf");
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

  test("entries map works", async () => {
    const api = await getApi();
    const blockHeight = 16044900;
    const blockHash = await api.rpc.chain.getBlockHash(blockHeight);

    const map = await getIdentityMap({ blockHeight, blockHash });
    const address = "1hCMdtRsaRA4ZTEKpPKPvEjK9rZpGhyFnRHSDhqFMCEayRL";
    expect(map[address].unwrap().info.display.asRaw.toUtf8()).toEqual(
      "RTTI-5220 (POLKADOT)",
    );
  });
});
