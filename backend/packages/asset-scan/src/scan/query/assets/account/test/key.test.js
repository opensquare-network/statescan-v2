const { getAssetAccountStorageKey } = require("../key");
const {
  test: { setStatemine },
} = require("@statescan/common");
const {
  chain: { disconnect, getApi, findBlockApi },
} = require("@osn/scan-common");
jest.setTimeout(3000000);

describe("Get", () => {
  beforeAll(async () => {
    await setStatemine();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("asset account storage key works", async () => {
    const api = await getApi();
    const blockHash = await api.rpc.chain.getBlockHash(408735);
    const blockApi = await findBlockApi(blockHash);

    const key = getAssetAccountStorageKey(
      8,
      "CpjsLDC1JFyrhm3ftC9Gs4QoyrkHKhZKtK7YqGTRFtTafgp",
      blockApi.registry,
    );
    expect(key).toEqual(
      "0x682a59d51ab9e48a8c8cc418ff9708d2b99d880ec681799c0cf30e8886371da9be1f3931028cc05c2e18a319e8f64f9e080000007de1acc72d42c39944451b6bdf599ae80aff6865635ae11013a83835c019d44ec3f865145943f487ae82a8e7bed3a66b",
    );
  });
});
