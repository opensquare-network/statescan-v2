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
  query MyQuery($height: Int!, $address: String!) {
    recoverable(height: $height, lostAccount: $address) {
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
