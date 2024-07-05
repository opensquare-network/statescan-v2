const announcement = /* GraphQL */ `
  type Announcement {
    announcementId: String!
    delegator: String!
    delegatee: String!
    callHash: String!
    normalizedCall: JSONObject
    isFinal: Boolean!
    executedAt: Indexer
    removedAt: Indexer
    rejectedAt: Indexer
    state: String!
    indexer: Indexer!
  }

  type AnnouncementTimeline {
    announcementId: String!
    name: String
    args: JSONObject
    indexer: Indexer!
  }

  type PagedAnnouncement {
    items: [Announcement]!
    offset: Int!
    limit: Int!
    total: Int!
  }
`;

module.exports = {
  announcement,
};
