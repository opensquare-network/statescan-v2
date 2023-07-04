// fixme: we should also add `additional` field
const info = /* GraphQL */ `
  type IdentityInfo {
    display: String
    legal: String
    web: String
    riot: String
    email: String
    image: String
    pgpFingerprint: String
    twitter: String
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
  }
`;

module.exports = {
  identityTypeDefs: [info, judgement, identity],
};
