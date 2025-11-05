const { getAccountStorageKey } = require("../accountStorageKey");
const {
  chain: { getApi },
  test: { setPolkadot, disconnect },
} = require("@osn/scan-common");
const { getOnChainAccounts } = require("../getOnChainAccounts");
jest.setTimeout(3000000);

describe("Query accounts", () => {
  beforeAll(async () => {
    await setPolkadot();
  });

  afterAll(async () => {
    await disconnect();
  });

  // eslint-disable-next-line jest/no-disabled-tests
  test.skip("works", async () => {
    const account = "13UVJyLnbVp9RBZYFwFGyDvVd1y27Tt8tkntv6Q7JVPhFsTB";
    const accounts = await getOnChainAccounts([
      account,
      "15yXFjMvRBDRiJzGgoJC4fDyCa8g9HGPjZEoEgJzzRVrXJa8",
    ]);
    expect(accounts.notExistedAddrs).toHaveLength(1);
    expect(accounts.existedAddrs).toHaveLength(1);
  });

  test("not existed", async () => {
    const api = await getApi();
    const blockHeight = 12005200;
    const blockHash = await api.rpc.chain.getBlockHash(blockHeight);
    const account = "15yXFjMvRBDRiJzGgoJC4fDyCa8g9HGPjZEoEgJzzRVrXJa8";
    const key = getAccountStorageKey(account);
    const result = await api.rpc.state.queryStorageAt([key], blockHash);
    expect(result[0].isNone).toBeTruthy();
  });
});
