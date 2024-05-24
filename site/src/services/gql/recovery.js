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
