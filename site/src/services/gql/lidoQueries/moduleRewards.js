import { gql } from "@apollo/client";

export const GET_LIDO_MODULE_REWARDS = gql`
  query GetLidoModuleRewards(
    $first: Int!
    $where: StETHSharesTransfer_filter
    $orderBy: StETHSharesTransfer_orderBy
    $orderDirection: OrderDirection
  ) {
    stETHSharesTransfers(
      first: $first
      where: $where
      orderBy: $orderBy
      orderDirection: $orderDirection
    ) {
      blockNumber
      blockTime
      id
      logIndex
      sharesValue
      stakingModule {
        id
        name
      }
      stakingModuleId
      txHash
    }
  }
`;
