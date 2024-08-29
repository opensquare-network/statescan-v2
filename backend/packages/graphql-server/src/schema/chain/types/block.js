const block = /* GraphQL */ `
  type Block {
    digest: JSONObject
    events: [Event]
    eventsCount: Int
    extrinsics: [Extrinsic]
    extrinsicsCount: Int
    extrinsicsRoot: String
    hash: String!
    height: Int!
    parentHash: String
    stateRoot: String
    time: Float!
    validator: String
  }

  type Extrinsic {
    call: Call
    hash: String!
    indexer: ExtrinsicIndexer
    isSigned: Boolean
    isSuccess: Boolean
    version: Int
  }

  type ExtrinsicIndexer {
    blockHeight: Int!
    blockHash: String!
    blockTime: Float!
    extrinsicIndex: Int
  }

  type Event {
    args: [JSONObject]
    docs: [String]
    indexer: EventIndexer
    isExtrinsic: Boolean
    isExtrinsicResult: Boolean
    method: String
    section: String
  }

  type EventIndexer {
    blockHeight: Int!
    blockHash: String!
    blockTime: Float!
    eventIndex: Int
    extrinsicIndex: Int
  }

  type Call {
    args: [JSONObject]
    callIndex: String
    method: String
    section: String
  }
`;

module.exports = {
  block,
};
