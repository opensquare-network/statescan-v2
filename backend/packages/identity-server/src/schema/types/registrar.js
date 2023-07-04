const registrar = /* GraphQL */ `
  type Registrar {
    index: Int!
    account: String!
    fee: String!
    identity: Identity
  }
`;

module.exports = {
  registrar,
};
