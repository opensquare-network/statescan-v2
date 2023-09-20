const multisigAddress = /* GraphQL */ `
  type MultisigAddress {
    address: String!
    signatories: [String]!
    threshold: Int!
  }
`;

module.exports = {
  multisigAddress,
};
