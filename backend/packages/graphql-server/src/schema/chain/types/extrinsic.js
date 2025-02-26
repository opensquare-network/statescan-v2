const extrinsic = /* GraphQL */ `
  type Extrinsic {
    call: Call
    calls: [InnerCall]
    callsCount: Int
    events: [Event]
    eventsCount: Int
    hash: String!
    indexer: ExtrinsicIndexer
    isSigned: Boolean
    isSuccess: Boolean
    lifetime: [Int]
    nonce: Int
    signature: String
    signer: String
    tip: String
    version: Int
    error: DispatchError
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

  type Call {
    args: [JSONObject]
    callIndex: String
    method: String
    section: String
  }

  type InnerCall {
    args: [JSONObject]
    callIndex: String
    method: String
    section: String
    eventAttributes: JSONObject
    indexer: CallIndexer
  }

  type CallIndexer {
    blockHeight: Int!
    blockHash: String!
    blockTime: Float!
    extrinsicIndex: Int
    callIndex: Int
  }

  type DispatchError {
    type: String
    code: String
    message: String
  }
`;

module.exports = {
  extrinsic,
};
