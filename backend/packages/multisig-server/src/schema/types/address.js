const multisigAddress = /* GraphQL */ `
  type MultisigAddress {
    address: String!
    signatories: [String]!
    threshold: Int!
    debutAt: Indexer!
    latestMultisigAt: Indexer!
  }
`;

module.exports = {
  multisigAddress,
};
