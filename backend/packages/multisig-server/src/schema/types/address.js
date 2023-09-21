const multisigAddress = /* GraphQL */ `
  type MultisigAddress {
    address: String!
    signatories: [String]!
    threshold: Int!
    debutAt: Indexer!
    latestMultisigAt: Indexer!
  }

  type PagedMultisigAddresses {
    multisigAddresses: [MultisigAddress]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  multisigAddress,
};
