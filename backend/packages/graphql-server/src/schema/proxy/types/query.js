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
    announcements(
      delegator: String
      delegatee: String
      isFinal: Boolean
      offset: Int!
      limit: Int!
    ): PagedAnnouncement!
    announcement(announcementId: String!): Announcement
    announcementTimeline(announcementId: String!): [AnnouncementTimeline]!
  }
`;

module.exports = {
  queries,
};
