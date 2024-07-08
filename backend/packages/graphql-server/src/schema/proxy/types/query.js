const queries = /* GraphQL */ `
  type Query {
    proxies(
      delegator: String
      delegatee: String
      isPure: Boolean
      isActive: Boolean
      offset: Int!
      limit: Int!
    ): PagedProxy!
    proxy(proxyId: String!): Proxy
    proxyTimeline(proxyId: String!): [ProxyTimeline]!
    proxyCalls(proxyId: String!, offset: Int!, limit: Int!): PagedProxyCall!
    proxyAnnouncements(
      delegator: String
      delegatee: String
      isFinal: Boolean
      offset: Int!
      limit: Int!
    ): PagedAnnouncement!
    proxyAnnouncement(announcementId: String!): Announcement
    proxyAnnouncementTimeline(announcementId: String!): [AnnouncementTimeline]!
  }
`;

module.exports = {
  queries,
};
