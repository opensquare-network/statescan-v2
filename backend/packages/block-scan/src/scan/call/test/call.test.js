const { extractCalls } = require("../index");
const {
  chain: { getApi, getBlockIndexer, },
  test: { setPolkadot, disconnect }
} = require("@osn/scan-common")
jest.setTimeout(3000000);

describe("extractCalls at", () => {
  beforeAll(async () => {
    await setPolkadot();
  });

  afterAll(async () => {
    await disconnect();
  });

  test("polkadot height 11001467 works", async () => {
    const api = await getApi();
    const blockHash = await api.rpc.chain.getBlockHash(11412957);
    const { block } = await api.rpc.chain.getBlock(blockHash);
    const allEvents = await api.query.system.events.at(blockHash);

    const blockIndexer = getBlockIndexer(block);

    const calls = await extractCalls(block.extrinsics, allEvents, blockIndexer);
    expect(calls).toEqual([
      {
        "indexer": {
          "blockHeight": 11412957,
          "blockHash": "0x538e8568c6d86aa7286b9a93ddcc4f97d428a01d4d476e184c72f5a4eb85355c",
          "blockTime": 1659337578012,
          "extrinsicIndex": 2,
          "callIndex": 0
        },
        "callIndex": "0x0500",
        "section": "balances",
        "method": "transfer",
        "args": [
          {
            "name": "dest",
            "type": "LookupSource",
            "value": "13wRVYcfZ8K9PdFD39jyqPHcjpgW1Sgh3ynvBsqK1L7jSYJH"
          },
          {
            "name": "value",
            "type": "Balance",
            "value": "50500000000"
          }
        ]
      },
      {
        "indexer": {
          "blockHeight": 11412957,
          "blockHash": "0x538e8568c6d86aa7286b9a93ddcc4f97d428a01d4d476e184c72f5a4eb85355c",
          "blockTime": 1659337578012,
          "extrinsicIndex": 2,
          "callIndex": 1
        },
        "callIndex": "0x0500",
        "section": "balances",
        "method": "transfer",
        "args": [
          {
            "name": "dest",
            "type": "LookupSource",
            "value": "12Tnfxs7EPj2UUG5KgwmhCVJHY4FuorhRE1vXs3KhKJKY7hv"
          },
          {
            "name": "value",
            "type": "Balance",
            "value": "79000000000"
          }
        ]
      },
      {
        "indexer": {
          "blockHeight": 11412957,
          "blockHash": "0x538e8568c6d86aa7286b9a93ddcc4f97d428a01d4d476e184c72f5a4eb85355c",
          "blockTime": 1659337578012,
          "extrinsicIndex": 3,
          "callIndex": 0
        },
        "callIndex": "0x6308",
        "section": "xcmPallet",
        "method": "limitedReserveTransferAssets",
        "args": [
          {
            "name": "dest",
            "type": "VersionedMultiLocation",
            "value": {
              "v1": {
                "parents": 0,
                "interior": {
                  "x1": {
                    "parachain": 2004
                  }
                }
              }
            }
          },
          {
            "name": "beneficiary",
            "type": "VersionedMultiLocation",
            "value": {
              "v1": {
                "parents": 0,
                "interior": {
                  "x1": {
                    "accountKey20": {
                      "network": {
                        "any": null
                      },
                      "key": "0x6588847fb80c60b45b3b1b0413cc4e30d1517fcd"
                    }
                  }
                }
              }
            }
          },
          {
            "name": "assets",
            "type": "VersionedMultiAssets",
            "value": {
              "v0": [
                {
                  "concreteFungible": {
                    "id": {
                      "null": null
                    },
                    "amount": 44820091021
                  }
                }
              ]
            }
          },
          {
            "name": "feeAssetItem",
            "type": "u32",
            "value": "0"
          },
          {
            "name": "weightLimit",
            "type": "WeightLimit",
            "value": {
              "limited": 1000000000
            }
          }
        ]
      }
    ])
  })
})
