const { hexToU8a } = require("@polkadot/util");

process.env.CHAIN = process.env.CHAIN || "statemint";

const { collectCandidates } = require("..");

const CONTRACT = "0xd1ca19e67da8737c691bb0a1d8bc12e538c7b4f2";
const SENDER = "0xdc75af658c86d79b0fda3cf376ca5b16413b40fe";
const BLOCK_INDEXER = {
  blockHeight: 12471380,
  blockHash:
    "0x9ca5370ddc3ce7ff247c8689e5de759c7a62c8ba341830edb5d9f05d7074ab65",
  blockTime: 1771724700000,
};

// The ethereum transaction of block 12471380 which created the VibePair contract, a call
// to `addLiquidity` of the router which deploys the pair by itself.
const ETH_TRANSACT_PAYLOAD =
  "0x02f9017784190f1b431285ba43b7400085ba43b740008316dbb0947532b23dfb30ac22b2a74e3b81cc288de19379ba80b90104e8e33700000000000000000000000000af905e66038ece89e03d843b35a11d262053b630000000000000000000000000bee14ad0949ebb63b90e04b8fd0a78af2f0f33540000000000000000000000000000000000000000000000001bc16d674ec8000000000000000000000000000000000000000000000000000000000000002ab9800000000000000000000000000000000000000000000000001a5e27eef13e000000000000000000000000000000000000000000000000000000000000002896a0000000000000000000000000dc75af658c86d79b0fda3cf376ca5b16413b40fe00000000000000000000000000000000000000000000000000000000699a6406c001a0539ecc6a02eeea61794a0a06fcb2077545d3f267233d682ac595672da0b26b88a06e07ae9fe9bf2d48ed0febcfb212bd26c49505a4b4eb41d33a2f8d83449e3a0d";

function contractEmitted(address, extrinsicIndex) {
  return {
    event: {
      section: "revive",
      method: "ContractEmitted",
      data: { contract: { toHex: () => address } },
    },
    phase: {
      isApplyExtrinsic: true,
      asApplyExtrinsic: { toNumber: () => extrinsicIndex },
    },
  };
}

function timestampSet() {
  return {
    isSigned: true,
    isGeneral: () => false,
    method: { section: "timestamp", method: "set", args: [] },
  };
}

function ethTransact(payload) {
  return {
    isSigned: false,
    isGeneral: () => false,
    method: {
      section: "revive",
      method: "ethTransact",
      args: [{ toU8a: () => hexToU8a(payload) }],
    },
  };
}

describe("collectCandidates", () => {
  it("collects a contract deployed inside an ethereum transaction", () => {
    const extrinsics = [
      timestampSet(),
      timestampSet(),
      timestampSet(),
      ethTransact(ETH_TRANSACT_PAYLOAD),
    ];
    const candidates = collectCandidates(
      [contractEmitted(CONTRACT, 3)],
      extrinsics,
      BLOCK_INDEXER,
    );

    expect([...candidates.keys()]).toEqual([CONTRACT]);
    expect(candidates.get(CONTRACT)).toEqual({
      address: CONTRACT,
      indexer: {
        ...BLOCK_INDEXER,
        extrinsicIndex: 3,
        eventIndex: 0,
      },
      deployer: SENDER,
    });
  });

  it("keeps the first appearance of an address in the block", () => {
    const events = [contractEmitted(CONTRACT, 2), contractEmitted(CONTRACT, 3)];
    const extrinsics = [
      timestampSet(),
      timestampSet(),
      ethTransact(ETH_TRANSACT_PAYLOAD),
      ethTransact(ETH_TRANSACT_PAYLOAD),
    ];
    const candidates = collectCandidates(events, extrinsics, BLOCK_INDEXER);

    expect(candidates.get(CONTRACT).indexer.extrinsicIndex).toEqual(2);
  });

  it("ignores the events which are not contract logs", () => {
    const events = [
      {
        event: { section: "revive", method: "Instantiated", data: [] },
        phase: {
          isApplyExtrinsic: true,
          asApplyExtrinsic: { toNumber: () => 1 },
        },
      },
      {
        event: { section: "balances", method: "Transfer", data: [] },
        phase: {
          isApplyExtrinsic: true,
          asApplyExtrinsic: { toNumber: () => 1 },
        },
      },
    ];
    const candidates = collectCandidates(
      events,
      [timestampSet()],
      BLOCK_INDEXER,
    );

    expect(candidates.size).toEqual(0);
  });

  it("leaves the extrinsic index empty for the events of the block itself", () => {
    const events = [
      {
        ...contractEmitted(CONTRACT, null),
        phase: { isApplyExtrinsic: false },
      },
    ];
    const candidates = collectCandidates(events, [], BLOCK_INDEXER);

    expect(candidates.get(CONTRACT)).toMatchObject({
      indexer: { ...BLOCK_INDEXER, extrinsicIndex: null },
      deployer: null,
    });
  });
});
