const {
  chain: { getApi },
  test: { setPolkadot, disconnect },
} = require("@osn/scan-common");
const { getNominator } = require("../nominators");
jest.setTimeout(3000000);

describe("Query nominator", () => {
  beforeAll(async () => {
    await setPolkadot();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("works", async () => {
    const api = await getApi();
    const blockHeight = 6713103;
    const blockHash = await api.rpc.chain.getBlockHash(blockHeight);
    const nominator = await getNominator(
      "13Ne3Gc3gmed5dc6LY5nV8Kyd6zpEMLCXKmkeziYxMHkvj8W",
      blockHash,
    );

    expect(nominator).toEqual({
      targets: [
        "1CHpqr1UKm8MAZZgViAvzombX2AgpQbDf7vJy864FQa55nk",
        "14dTZLAwhcBennygERRS5tXnWVAHq3e12LoCoHrQsmDd4X4H",
        "125xj1nYWcVcCM9CnLUydqEmuFwSNTmRybmyK65XWu8RFWK3",
        "15zDWoFYi5m2VMb9yXeBa8CozgRDGEXoW14WLXPXPXGj9kvi",
        "12LKeuFyyjC94iXpHftt3UVu567ji5WyKE6MvDBDWVJUuuJJ",
        "1653t723BHhC2krGCFKUUNDQb5sUafy5pZvKVwnwo1oMAMi7",
        "16FUnnZX7h11sxio9wu6DGGqD66z5vXxNLcXuSJFWFAjkaZ5",
        "16JcdktXy1ykqPPtQsu4jrtSg7nBfBxKShe64oLxJkeaEb5h",
        "15ictvkBL2D3aWxyoqh8roJkRC1tdFw3SCLqjyssjuf6yiC9",
        "13W8fgmJvTZ578FpeQZqVtnPt7YJYV8oF1yXA49LijG7kNaW",
        "14ianQU2g46wntbuJxx6u9cM6s8uvLngW1y9xKCcnejBHdTy",
        "128xoAmYDMLixg9Dv4sQz3vJnG94Jt1s2hp37PR8CQZMMMfp",
        "16fL6kGX64fQ8cCvRu15idGS1VZnLiCZkkDWQer981ux5FRA",
        "15yiAFuYzks3FGG8cTc2ukw86JCYKrZqKkmStVhTL4hv77XV",
        "15uBfpvbPWSUaiLjrgT3H389axNwLkduKA3GB88C1fqbWLpz",
        "13gaBDtm7gkyBXuqoYvUC4z7oYSFGBRcX9F4fa4vk3mvh2KX",
      ],
      submittedIn: 257,
      suppressed: false,
    });
  });
});
