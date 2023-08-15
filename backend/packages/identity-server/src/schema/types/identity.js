const info = /* GraphQL */ `
  scalar JSON
  scalar JSONObject

  type IdentityInfo {
    display: String
    legal: String
    web: String
    riot: String
    email: String
    image: String
    pgpFingerprint: String
    twitter: String
    additional: JSONObject
  }
`;

const judgement = /* GraphQL */ `
  type Judgement {
    registrarIndex: Int!
    judgement: String!
  }
`;

const identity = /* GraphQL */ `
  type Identity {
    account: String!
    deposit: String
    display: String
    fullDisplay: String
    info: IdentityInfo
    isSub: Boolean
    judgements: [Judgement]
    subs: [String]
    subsCount: Int!
    subsDeposit: String
    lastUpdate: Indexer!
  }

  type PagedIdentities {
    identities: [Identity]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  identityTypeDefs: [info, judgement, identity],
};
