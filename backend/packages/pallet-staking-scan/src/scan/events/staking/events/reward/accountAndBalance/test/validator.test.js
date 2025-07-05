const {
  test: { setKusama, disconnect },
  chain: { getBlockHash },
} = require("@osn/scan-common");
const { hasPayoutValidatorCall } = require("../common");
jest.setTimeout(3000000);

describe("validator", () => {
  beforeAll(async () => {
    await setKusama();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("check payoutValidator works", async () => {
    const blockHeight = 1384193;
    const blockHash = await getBlockHash(blockHeight);
    expect(await hasPayoutValidatorCall(blockHash)).toBeTruthy();
  });
});
