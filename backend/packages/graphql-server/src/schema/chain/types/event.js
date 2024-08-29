const event = /* GraphQL */ `
  type Event {
    args: [JSONObject]
    docs: [String]
    indexer: EventIndexer
    isExtrinsic: Boolean
    isExtrinsicResult: Boolean
    method: String
    section: String
  }
`;

module.exports = {
  event,
};
