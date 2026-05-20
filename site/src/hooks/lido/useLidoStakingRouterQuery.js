import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "../../store/reducers/toastSlice";

const stakingRouterGraphqlUrl =
  process.env.REACT_APP_PUBLIC_LIDO_STAKING_ROUTER_GRAPHQL_URL;

const stakingRouterClient = new ApolloClient({
  uri: stakingRouterGraphqlUrl || "/",
  cache: new InMemoryCache(),
});

export function useLidoStakingRouterQuery(query, options = {}) {
  const dispatch = useDispatch();
  const missingGraphqlUrl = !stakingRouterGraphqlUrl;
  const queryResult = useQuery(query, {
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
    ...options,
    skip: missingGraphqlUrl || options.skip,
    client: stakingRouterClient,
  });

  useEffect(() => {
    if (missingGraphqlUrl) {
      dispatch(
        addToast({
          type: "error",
          message:
            "REACT_APP_PUBLIC_LIDO_STAKING_ROUTER_GRAPHQL_URL is not set",
        }),
      );
      return;
    }

    if (!queryResult.error) {
      return;
    }

    dispatch(
      addToast({
        type: "error",
        message: queryResult.error.message || "Failed to load Lido data",
      }),
    );
  }, [dispatch, missingGraphqlUrl, queryResult.error]);

  return queryResult;
}
