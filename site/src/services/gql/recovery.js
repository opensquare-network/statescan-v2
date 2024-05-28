import { gql } from "@apollo/client";

export const GET_RECOVERABLES = gql`
  query MyQuery(
    $limit: Int!
    $offset: Int!
    $lostAccount: String
    $active: Boolean
  ) {
    recoverables(
      limit: $limit
      offset: $offset
      lostAccount: $lostAccount
      active: $active
    ) {
      limit
      offset
      total
      items {
        deposit
        delayPeriod
        friends
        who
        threshold
        isActive
        rescuer
        height
      }
    }
  }
`;

export const GET_RECOVERABLE = gql`
  query MyQuery($height: Int!, $lostAccount: String!) {
    recoverable(height: $height, lostAccount: $lostAccount) {
      friends
      threshold
      who
      rescuer
      deposit
      isActive
      removedAt {
        blockHeight
      }
      height
    }
  }
`;

export const GET_RECOVERABLE_TIMELINE = gql`
  query MyQuery(
    $recoverableHeight: Int!
    $lostAccount: String!
    $limit: Int!
    $offset: Int!
  ) {
    recoverableTimeline(
      recoverableHeight: $recoverableHeight
      lostAccount: $lostAccount
      limit: $limit
      offset: $offset
    ) {
      items {
        name
        recoverableHeight
        args
        indexer {
          blockHeight
          blockTime
          extrinsicIndex
          eventIndex
        }
      }
    }
  }
`;

export const GET_RECOVERABLE_RECOVERIES = gql`
  query MyQuery(
    $limit: Int!
    $lostAccount: String!
    $offset: Int!
    $recoverableHeight: Int!
  ) {
    recoverableRecoveries(
      limit: $limit
      lostAccount: $lostAccount
      offset: $offset
      recoverableHeight: $recoverableHeight
    ) {
      limit
      offset
      total
      items {
        threshold
        rescuerAccount
        lostAccount
        isClosed
        friends
        deposit
        created
        allFriends
      }
    }
  }
`;

export const GET_RECOVERABLE_CALLS = gql`
  query MyQuery(
    $recoverableHeight: Int!
    $lostAccount: String!
    $limit: Int!
    $offset: Int!
  ) {
    recoverableCalls(
      recoverableHeight: $recoverableHeight
      lostAccount: $lostAccount
      limit: $limit
      offset: $offset
    ) {
      items {
        call
        rescuer
        recoverableHeight
        lostAccount
        indexer {
          blockHeight
          blockTime
        }
      }
    }
  }
`;

export const GET_RECOVERIES = gql`
  query MyQuery(
    $limit: Int!
    $offset: Int!
    $lostAccount: String
    $active: Boolean
  ) {
    recoveries(
      limit: $limit
      offset: $offset
      lostAccount: $lostAccount
      active: $active
    ) {
      limit
      offset
      total
      items {
        allFriends
        created
        deposit
        friends
        isClosed
        lostAccount
        rescuerAccount
        threshold
      }
    }
  }
`;

export const GET_RECOVERY = gql`
  query MyQuery(
    $created: Int!
    $lostAccount: String!
    $rescuerAccount: String!
  ) {
    recovery(
      created: $created
      lostAccount: $lostAccount
      rescuerAccount: $rescuerAccount
    ) {
      threshold
      rescuerAccount
      lostAccount
      isClosed
      friends
      deposit
      created
      allFriends
    }
  }
`;

export const GET_RECOVERY_TIMELINE = gql`
  query MyQuery(
    $created: Int!
    $lostAccount: String!
    $rescuerAccount: String!
    $limit: Int!
    $offset: Int!
  ) {
    recoveryTimeline(
      created: $created
      lostAccount: $lostAccount
      rescuerAccount: $rescuerAccount
      limit: $limit
      offset: $offset
    ) {
      items {
        rescuerAccount
        name
        lostAccount
        args
        indexer {
          blockTime
          eventIndex
          extrinsicIndex
          blockHeight
        }
        created
      }
    }
  }
`;

export const GET_RECOVERY_PROXIES = gql`
  query MyQuery($limit: Int!, $offset: Int!) {
    recoveryProxies(limit: $limit, offset: $offset) {
      limit
      offset
      total
      items {
        lost
        rescuer
      }
    }
  }
`;
