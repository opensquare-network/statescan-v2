const registrar = /* GraphQL */ `
  type RegistrarStat {
    request: Int!
    given: Int!
    totalFee: String!
  }

  type Registrar {
    index: Int!
    account: String!
    fee: String!
    identity: Identity
    statistics: RegistrarStat!
  }
`;

module.exports = {
  registrar,
};
