const { normalizeIdentityJudgements } = require("../../utils");
const { queryIdentityInfo } = require("../info");
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

  test("works", async () => {
    const api = await getApi();
    const blockHeight = 16044900;
    const blockHash = await api.rpc.chain.getBlockHash(blockHeight);

    const rawInfo = await queryIdentityInfo(
      "16GDRhRYxk42paoK6TfHAqWej8PdDDUwdDazjv4bAn4KGNeb",
      { blockHeight, blockHash },
    );

    const identity = rawInfo.unwrap();
    expect(identity.info.display.asRaw.toHuman()).toEqual("CP287-CLOUDWALK");
    expect(identity.info.legal.asRaw.toHuman()).toBeNull();
    expect(identity.info.web.asRaw.toHuman()).toEqual("https://cp0x.com");
    expect(identity.info.riot.asRaw.toHuman()).toEqual("@illlefr4u:matrix.org");
    expect(identity.info.email.asRaw.toHuman()).toEqual("illlefr4u@gmail.com");
    expect(identity.info.image.asRaw.toHuman()).toEqual(null);
    expect(identity.info.pgpFingerprint.toJSON()).toEqual(null);
    expect(identity.info.twitter.asRaw.toHuman()).toEqual("@kaplansky1");
    expect(identity.info.additional.toJSON()).toEqual([]);

    expect(identity.deposit.toString()).toEqual("202580000000");

    expect(normalizeIdentityJudgements(identity.judgements)).toEqual([
      {
        registrarIndex: 1,
        judgement: "Reasonable",
      },
    ]);
  });
});
