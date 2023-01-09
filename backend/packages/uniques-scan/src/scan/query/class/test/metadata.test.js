const { queryClassMetadata } = require("../metadata");
const {
  test: { setStatemine },
} = require("@statescan/common");
const {
  chain: { disconnect, getApi },
} = require("@osn/scan-common");
jest.setTimeout(3000000);

describe("Query class metadata", () => {
  beforeAll(async () => {
    await setStatemine();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("of uniques #0 works", async () => {
    const height = 338600;
    const api = await getApi();
    const blockHash = await api.rpc.chain.getBlockHash(height);

    const metadata = await queryClassMetadata(0, blockHash);
    expect(metadata).toEqual({
      deposit: 0,
      data: "0x516d626552624d65436571385374625550504e7171554e3663657663464e665066453538545638756b6d694b6b52",
      isFrozen: false,
    });
  });
});
