const { queryAsset } = require("../asset");
const {
  test: { setStatemine },
} = require("@statescan/common");
const {
  chain: { disconnect, getApi },
} = require("@osn/scan-common");
jest.setTimeout(3000000);

describe("Query", () => {
  beforeAll(async () => {
    await setStatemine();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("asset works", async () => {
    const height = 954733;

    const api = await getApi();
    const blockHash = await api.rpc.chain.getBlockHash(height);
    const asset = await queryAsset(blockHash, 8);
    expect(asset.owner).toEqual(
      "HKKT5DjFaUE339m7ZWS2yutjecbUpBcDQZHw2EF7SFqSFJH",
    );
  });
});
