const {
  chain: { getApi },
  test: { disconnect, setKusama },
} = require("@osn/scan-common");
const { queryMultisig } = require("../multisig");
jest.setTimeout(3000000);

describe("Query", () => {
  beforeAll(async () => {
    await setKusama();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("multisig works", async () => {
    const api = await getApi();
    const blockHeight = 2713627;
    const blockHash = await api.rpc.chain.getBlockHash(blockHeight);

    const multisigAccount = "DWUAQt9zcpnQt5dT48NwWbJuxQ78vKRK9PRkHDkGDn9TJ1j";
    const callHash =
      "0x94e4e18706ec9c35a269182d399c5d21409e2d1dd839c5e4f47ca3714dbc4968";
    const multisig = await queryMultisig(multisigAccount, callHash, {
      blockHeight,
      blockHash,
    });
    expect(multisig.isSome).toBeTruthy();
    expect(multisig.toJSON()).toEqual({
      when: {
        height: 2713627,
        index: 4,
      },
      deposit: 9270000000000,
      depositor: "FG78iuAYrn43g8b3DFjroC6mTyMDqc5xk6cbETsH1MFGCKa",
      approvals: ["FG78iuAYrn43g8b3DFjroC6mTyMDqc5xk6cbETsH1MFGCKa"],
    });
  });
});
