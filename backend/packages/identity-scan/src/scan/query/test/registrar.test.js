const { queryRegistrars } = require("../registrar");
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

  test("registrar works", async () => {
    const api = await getApi();
    const blockHeight = 16044900;
    const blockHash = await api.rpc.chain.getBlockHash(blockHeight);

    const rawRegistrars = await queryRegistrars({ blockHeight, blockHash });
    expect(rawRegistrars.toJSON()).toEqual([
      {
        account: "12j3Cz8qskCGJxmSJpVL2z2t3Fpmw3KoBaBaRGPnuibFc7o8",
        fee: 0,
        fields: [],
      },
      {
        account: "1Reg2TYv9rGfrQKpPREmrHRxrNsUDBQKzkYwP1UstD97wpJ",
        fee: 180000000000,
        fields: [],
      },
      {
        account: "1EpXirnoTimS1SWq52BeYx7sitsusXNGzMyGx8WPujPd1HB",
        fee: 0,
        fields: [],
      },
    ]);
  });
});
