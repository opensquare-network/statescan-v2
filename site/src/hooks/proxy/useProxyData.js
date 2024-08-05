import { gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { useProxyQuery } from "../apollo";

const GET_PROXY = gql`
  query MyQuery($proxyId: String!) {
    proxy(proxyId: $proxyId) {
      delay
      type
      indexer {
        blockTime
        eventIndex
        extrinsicIndex
        blockHeight
        blockHash
      }
      delegator
      delegatee
      isPure
      isRemoved
      proxyId
    }
  }
`;

export function useProxyData() {
  const { id } = useParams();

  const { data, ...rest } = useProxyQuery(GET_PROXY, {
    variables: {
      proxyId: id,
    },
  });

  return { data: data?.proxy, ...rest };
}
