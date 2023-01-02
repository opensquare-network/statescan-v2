const { queryClassDetails } = require("../details");
const {
  test: { setStatemine },
} = require("@statescan/common");
const {
  chain: { disconnect, getApi },
} = require("@osn/scan-common");
jest.setTimeout(3000000);

describe("Query class details", () => {
  beforeAll(async () => {
    await setStatemine();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("of 0 works", async () => {
    const height = 323750;
    const api = await getApi();
    const blockHash = await api.rpc.chain.getBlockHash(height);

    const details = await queryClassDetails(0, blockHash);
    expect(details).toEqual({
      owner: "FhZnLuv3abyNhurW4Bop35YdNQkxK7maB6S1YXeo78jB5oK",
      issuer: "FhZnLuv3abyNhurW4Bop35YdNQkxK7maB6S1YXeo78jB5oK",
      admin: "FhZnLuv3abyNhurW4Bop35YdNQkxK7maB6S1YXeo78jB5oK",
      freezer: "FhZnLuv3abyNhurW4Bop35YdNQkxK7maB6S1YXeo78jB5oK",
      totalDeposit: 0,
      freeHolding: true,
      instances: 0,
      instanceMetadatas: 0,
      attributes: 0,
      isFrozen: false,
    });
  });
});
