const { queryAssetsAccounts } = require("../index");
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

  test("assets accounts works", async () => {
    const api = await getApi();
    const blockHash = await api.rpc.chain.getBlockHash(
      // 757876
      3000000,
    );

    const accounts = await queryAssetsAccounts(
      8,
      ["CpjsLDC1JFyrhm3ftC9Gs4QoyrkHKhZKtK7YqGTRFtTafgp"],
      blockHash,
    );

    expect(accounts[0].info.balance).toEqual("11873550100000");
  });
});
