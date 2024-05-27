import { gql } from "@apollo/client";

export const GET_RECOVERABLES = gql`
  query MyQuery($limit: Int!, $offset: Int!) {
    recoverables(limit: $limit, offset: $offset) {
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

export const GET_RECOVERABLES_CALLS = gql`
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
  query MyQuery($limit: Int!, $offset: Int!) {
    recoveries(limit: $limit, offset: $offset) {
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
