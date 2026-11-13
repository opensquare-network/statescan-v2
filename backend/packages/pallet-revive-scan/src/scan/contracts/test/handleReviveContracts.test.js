const { hexToU8a } = require("@polkadot/util");

process.env.CHAIN = process.env.CHAIN || "statemint";

const CONTRACT = "0xd1ca19e67da8737c691bb0a1d8bc12e538c7b4f2";
const SENDER = "0xdc75af658c86d79b0fda3cf376ca5b16413b40fe";
const CODE_HASH =
  "0x57de6890c294c4a4e332d0cd4a4e2ff6fa31b038b5d07eeb51420744a3b7456f";
const CODE = "0x60016000";
const HEIGHT = 12471380;
const BLOCK_TIME = 1771724700000;

// The ethereum transaction of block 12471380 which created the VibePair contract, a call
// to `addLiquidity` of the router which deploys the pair by itself.
const ETH_TRANSACT_PAYLOAD =
  "0x02f9017784190f1b431285ba43b7400085ba43b740008316dbb0947532b23dfb30ac22b2a74e3b81cc288de19379ba80b90104e8e33700000000000000000000000000af905e66038ece89e03d843b35a11d262053b630000000000000000000000000bee14ad0949ebb63b90e04b8fd0a78af2f0f33540000000000000000000000000000000000000000000000001bc16d674ec8000000000000000000000000000000000000000000000000000000000000002ab9800000000000000000000000000000000000000000000000001a5e27eef13e000000000000000000000000000000000000000000000000000000000000002896a0000000000000000000000000dc75af658c86d79b0fda3cf376ca5b16413b40fe00000000000000000000000000000000000000000000000000000000699a6406c001a0539ecc6a02eeea61794a0a06fcb2077545d3f267233d682ac595672da0b26b88a06e07ae9fe9bf2d48ed0febcfb212bd26c49505a4b4eb41d33a2f8d83449e3a0d";

let mockApi = null;
let mockContracts = [];
let mockTokens = [];
let mockVerifiedAddresses = new Set();

jest.mock("@osn/scan-common", () => ({
  chain: {
    findBlockApi: async () => mockApi,
    getExtrinsicSigner: () => null,
  },
  env: { currentChain: () => "statemint" },
  logger: { error: jest.fn(), warn: jest.fn() },
}));

jest.mock("@statescan/mongo", () => ({
  palletRevive: {
    getContractCol: async () => ({
      find: () => ({
        toArray: async () => mockContracts.map(({ address }) => ({ address })),
      }),
      findOne: async ({ address }) =>
        mockContracts.find((contract) => contract.address === address) || null,
      updateOne: async (filter, update) => {
        mockContracts.push(update.$setOnInsert);
      },
    }),
    getTokenCol: async () => ({
      updateOne: async (filter, update) => {
        mockTokens.push(update.$set);
      },
    }),
    getVerifiedContractCol: async () => ({
      findOne: async ({ address }) =>
        mockVerifiedAddresses.has(address) ? { _id: address } : null,
    }),
  },
}));

const { handleReviveContracts, saveObservedContract } = require("..");

function hashOfHeight(height) {
  return `0x${BigInt(height).toString(16).padStart(64, "0")}`;
}

function someAccountInfo() {
  return {
    isEmpty: false,
    toJSON: () => ({ accountType: { contract: { codeHash: CODE_HASH } } }),
  };
}

const noneAccountInfo = { isEmpty: true };

// A chain where the contract account info appears at `creationHeight` and stays.
function makeApi(creationHeight, { token = false } = {}) {
  return {
    call: {
      reviveApi: {
        call: async (origin, address, value, weight, deposit, data) => {
          const answer = token ? TOKEN_ANSWERS[data] : null;
          return answer
            ? {
                toJSON: () => ({
                  result: { ok: { flags: { bits: 0 }, data: answer } },
                }),
              }
            : REVERTED_GETTER;
        },
      },
    },
    query: {
      revive: {
        accountInfoOf: {
          at: async (hash) => {
            const height = Number(BigInt(hash));
            return height >= creationHeight
              ? someAccountInfo()
              : noneAccountInfo;
          },
        },
        pristineCode: async () => ({
          isEmpty: false,
          toU8a: () => hexToU8a(CODE),
        }),
      },
      timestamp: {
        now: { at: async () => ({ toNumber: () => BLOCK_TIME }) },
      },
    },
    rpc: {
      chain: {
        getBlockHash: async (height) => ({
          isEmpty: false,
          toHex: () => hashOfHeight(height),
        }),
      },
    },
  };
}

function makeBlock() {
  return {
    hash: { toHex: () => hashOfHeight(HEIGHT) },
    header: {
      number: { toNumber: () => HEIGHT },
      parentHash: { toHex: () => hashOfHeight(HEIGHT - 1) },
    },
    extrinsics: [
      {
        isSigned: false,
        isGeneral: () => false,
        method: {
          section: "revive",
          method: "ethTransact",
          args: [{ toU8a: () => hexToU8a(ETH_TRANSACT_PAYLOAD) }],
        },
      },
    ],
  };
}

const TOKEN_NAME = "Vibe Pair Token";
const TOKEN_SYMBOL = "VIBE";
const TOKEN_DECIMALS = 18;
const TOKEN_SUPPLY = 1000000000000000000000n;

function uintWord(value) {
  return `0x${BigInt(value).toString(16).padStart(64, "0")}`;
}

// The offset and the length of the bytes followed by the zero padded text.
function abiString(text) {
  const bytes = Buffer.from(text, "utf8");
  const padding = Buffer.alloc((32 - (bytes.length % 32)) % 32);
  return `0x${uintWord(32).slice(2)}${uintWord(bytes.length).slice(
    2,
  )}${Buffer.concat([bytes, padding]).toString("hex")}`;
}

function bytes32String(text) {
  const bytes = Buffer.from(text, "utf8");
  return `0x${Buffer.concat([bytes, Buffer.alloc(32 - bytes.length)]).toString(
    "hex",
  )}`;
}

const TOKEN_ANSWERS = {
  "0x06fdde03": abiString(TOKEN_NAME),
  "0x95d89b41": bytes32String(TOKEN_SYMBOL),
  "0x313ce567": uintWord(TOKEN_DECIMALS),
  "0x18160ddd": uintWord(TOKEN_SUPPLY),
};

const REVERTED_GETTER = {
  toJSON: () => ({ result: { ok: { flags: { bits: 1 }, data: "0x" } } }),
};

const BLOCK_INDEXER = {
  blockHeight: HEIGHT,
  blockHash: hashOfHeight(HEIGHT),
  blockTime: BLOCK_TIME,
};

const CONTRACT_EMITTED = {
  event: {
    section: "revive",
    method: "ContractEmitted",
    data: { contract: { toHex: () => CONTRACT } },
  },
  phase: { isApplyExtrinsic: true, asApplyExtrinsic: { toNumber: () => 0 } },
};

describe("handleReviveContracts", () => {
  beforeEach(() => {
    mockContracts = [];
    mockTokens = [];
    mockVerifiedAddresses = new Set();
  });

  it("stores a contract which is created by this block", async () => {
    mockApi = makeApi(HEIGHT);

    await handleReviveContracts({
      block: makeBlock(),
      events: [CONTRACT_EMITTED],
      blockIndexer: BLOCK_INDEXER,
    });

    expect(mockContracts).toEqual([
      {
        address: CONTRACT,
        deployer: SENDER,
        codeHash: CODE_HASH,
        code: CODE,
        codeLen: 4,
        indexer: { ...BLOCK_INDEXER, extrinsicIndex: 0, eventIndex: 0 },
      },
    ]);
  });

  it("skips the contract which is already indexed", async () => {
    mockApi = makeApi(HEIGHT);
    mockContracts = [{ address: CONTRACT }];

    await handleReviveContracts({
      block: makeBlock(),
      events: [CONTRACT_EMITTED],
      blockIndexer: BLOCK_INDEXER,
    });

    expect(mockContracts).toEqual([{ address: CONTRACT }]);
  });

  it("locates the creation block of a contract missed by the scan", async () => {
    const creationHeight = HEIGHT - 300;
    mockApi = makeApi(creationHeight);

    await handleReviveContracts({
      block: makeBlock(),
      events: [CONTRACT_EMITTED],
      blockIndexer: BLOCK_INDEXER,
    });

    expect(mockContracts).toEqual([
      {
        address: CONTRACT,
        deployer: null,
        codeHash: CODE_HASH,
        code: CODE,
        codeLen: 4,
        indexer: { blockHeight: creationHeight, blockTime: BLOCK_TIME },
      },
    ]);
  });

  it("skips the addresses which are not contract accounts", async () => {
    mockApi = makeApi(HEIGHT);
    mockApi.query.revive.accountInfoOf.at = async () => noneAccountInfo;

    await handleReviveContracts({
      block: makeBlock(),
      events: [CONTRACT_EMITTED],
      blockIndexer: BLOCK_INDEXER,
    });

    expect(mockContracts).toEqual([]);
  });

  it("stores the metadata of a token contract as soon as it is indexed", async () => {
    mockApi = makeApi(HEIGHT, { token: true });
    mockVerifiedAddresses = new Set([CONTRACT]);

    await handleReviveContracts({
      block: makeBlock(),
      events: [CONTRACT_EMITTED],
      blockIndexer: BLOCK_INDEXER,
    });

    expect(mockTokens).toHaveLength(1);
    expect(mockTokens[0]).toMatchObject({
      address: CONTRACT,
      name: TOKEN_NAME,
      symbol: TOKEN_SYMBOL,
      decimals: TOKEN_DECIMALS,
      totalSupply: TOKEN_SUPPLY.toString(),
      standard: "ERC20",
      verified: true,
      deployer: SENDER,
      codeHash: CODE_HASH,
      indexer: { ...BLOCK_INDEXER, extrinsicIndex: 0, eventIndex: 0 },
      readAt: { blockHeight: HEIGHT, blockTime: BLOCK_TIME },
    });
  });

  it("keeps a contract which reverts on the getters out of the token list", async () => {
    mockApi = makeApi(HEIGHT);

    await handleReviveContracts({
      block: makeBlock(),
      events: [CONTRACT_EMITTED],
      blockIndexer: BLOCK_INDEXER,
    });

    expect(mockContracts).toHaveLength(1);
    expect(mockTokens).toEqual([]);
  });
});

describe("saveObservedContract", () => {
  beforeEach(() => {
    mockContracts = [];
  });

  it("indexes a contract read from the state with the given code hash", async () => {
    mockApi = makeApi(HEIGHT);
    const pristineCode = jest.fn(async () => ({
      isEmpty: false,
      toU8a: () => hexToU8a(CODE),
    }));
    mockApi.query.revive.pristineCode = pristineCode;

    const indexer = { blockHeight: HEIGHT, blockTime: BLOCK_TIME };
    const col = {
      updateOne: async (filter, update) =>
        mockContracts.push(update.$setOnInsert),
    };

    await saveObservedContract(col, mockApi, makeBlock(), {
      address: CONTRACT,
      codeHash: CODE_HASH,
      deployer: null,
      indexer,
    });

    expect(pristineCode).toHaveBeenCalledWith(CODE_HASH);
    expect(mockContracts).toEqual([
      {
        address: CONTRACT,
        deployer: null,
        codeHash: CODE_HASH,
        code: CODE,
        codeLen: 4,
        indexer,
      },
    ]);
  });
});
