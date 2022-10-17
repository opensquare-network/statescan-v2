const {
  chain: { getApi, getBlockIndexer },
  test: { setPolkadot, disconnect },
  utils: { extractExtrinsicEvents },
} = require("@osn/scan-common");
const { extractCallsFromExtrinsic } = require("../index");
jest.setTimeout(3000000);

describe("extractCalls of", () => {
  beforeAll(async () => {
    await setPolkadot();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("polkadot 11001467-2 works", async () => {
    const api = await getApi();
    const blockHash = await api.rpc.chain.getBlockHash(11412957);
    const { block } = await api.rpc.chain.getBlock(blockHash);
    const allEvents = await api.query.system.events.at(blockHash);
    const blockIndexer = getBlockIndexer(block);

    const events = extractExtrinsicEvents(allEvents, 2);

    const calls = await extractCallsFromExtrinsic(block.extrinsics[2], events, {
      ...blockIndexer,
      extrinsicIndex: 2,
    });

    expect(calls).toEqual([
      {
        indexer: {
          blockHeight: 11412957,
          blockHash:
            "0x538e8568c6d86aa7286b9a93ddcc4f97d428a01d4d476e184c72f5a4eb85355c",
          blockTime: 1659337578012,
          extrinsicIndex: 2,
          callIndex: 0,
        },
        callIndex: "0x0500",
        section: "balances",
        method: "transfer",
        args: [
          {
            name: "dest",
            type: "LookupSource",
            value: "13wRVYcfZ8K9PdFD39jyqPHcjpgW1Sgh3ynvBsqK1L7jSYJH",
          },
          {
            name: "value",
            type: "Balance",
            value: "50500000000",
          },
        ],
        eventAttributes: {
          isCall: true,
          offset: 0,
          length: 4,
        },
      },
      {
        indexer: {
          blockHeight: 11412957,
          blockHash:
            "0x538e8568c6d86aa7286b9a93ddcc4f97d428a01d4d476e184c72f5a4eb85355c",
          blockTime: 1659337578012,
          extrinsicIndex: 2,
          callIndex: 1,
        },
        callIndex: "0x0500",
        section: "balances",
        method: "transfer",
        args: [
          {
            name: "dest",
            type: "LookupSource",
            value: "12Tnfxs7EPj2UUG5KgwmhCVJHY4FuorhRE1vXs3KhKJKY7hv",
          },
          {
            name: "value",
            type: "Balance",
            value: "79000000000",
          },
        ],
        eventAttributes: {
          isCall: true,
          offset: 5,
          length: 3,
        },
      },
    ]);
  });
});
