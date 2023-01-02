const { queryClassAttribute } = require("../attribute");
const {
  chain: { disconnect, getApi },
} = require("@osn/scan-common");
const {
  test: { setStatemine },
} = require("@statescan/common");
jest.setTimeout(3000000);

describe("Query statemine class attribute", () => {
  beforeAll(async () => {
    await setStatemine();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("of 1337 works", async () => {
    const height = 1279349;
    const api = await getApi();
    const blockHash = await api.rpc.chain.getBlockHash(height);

    const metadata = await queryClassAttribute(1337, "0x6e616d65", blockHash);
    expect(metadata).toEqual(["0x6d33373476303164", 6670666560]);
  });
});
