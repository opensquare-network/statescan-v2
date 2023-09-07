const { queryMultipleSuperOfAsMap } = require("../supersOf");
const {
  chain: { getApi },
  test: { setKusama, disconnect },
} = require("@osn/scan-common");
const { dataAsString } = require("../../utils/dataAsString");
jest.setTimeout(3000000);

describe("Query identity", () => {
  beforeAll(async () => {
    await setKusama();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("supers of map works", async () => {
    const api = await getApi();
    const blockHeight = 5898299;
    const blockHash = await api.rpc.chain.getBlockHash(blockHeight);

    const account1 = "DB2mp5nNhbFN86J9hxoAog8JALMhDXgwvWMxrRMLNUFMEY4";
    const account2 = "H9R6HgnZKtrcfBJP2M6WCvLJvp72Q96eURbCxmj6KCFVWjh";
    const account3 = "Ewuf7jpvMRWWkUHpc6tPsHa2BUVv4avskPyhFo44er2e4PJ";
    const accounts = [account1, account2, account3];

    const superOfMap = await queryMultipleSuperOfAsMap(accounts, {
      blockHeight,
      blockHash,
    });
    const superOf = superOfMap[account1];
    expect(superOf).toBeTruthy();
    expect(dataAsString(superOf.unwrap()[1])).toEqual("v01");
    expect(dataAsString(superOfMap[account2].unwrap()[1])).toEqual("v02");
    expect(dataAsString(superOfMap[account3].unwrap()[1])).toEqual("v03");
  });
});
