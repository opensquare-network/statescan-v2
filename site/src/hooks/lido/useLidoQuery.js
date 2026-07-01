import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "../../store/reducers/toastSlice";
import {
  lidoClient,
  lidoGraphqlUrl,
  lidoServerClient,
  lidoServerUrl,
  stakingRouterClient,
  stakingRouterGraphqlUrl,
} from "./lidoGraphqlClient";

export { lidoClient, lidoServerClient, lidoServerUrl };

export function useLidoApolloQuery({
  query,
  options = {},
  client,
  url,
  errorMessage,
}) {
  const dispatch = useDispatch();
  const missingUrl = !url;
  const queryResult = useQuery(query, {
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
    ...options,
    skip: missingUrl || options.skip,
    client,
  });

  useEffect(() => {
    if (missingUrl) {
      dispatch(
        addToast({
          type: "error",
          message: "Lido GraphQL URL is not set",
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
        message: queryResult.error.message || errorMessage,
      }),
    );
  }, [dispatch, errorMessage, missingUrl, queryResult.error]);

  return queryResult;
}

export function useLidoQuery(query, options = {}) {
  return useLidoApolloQuery({
    query,
    options,
    client: lidoClient,
    url: lidoGraphqlUrl,
    errorMessage: "Failed to load Lido data",
  });
}

export function useLidoServerQuery(query, options = {}) {
  return useLidoApolloQuery({
    query,
    options,
    client: lidoServerClient,
    url: lidoServerUrl,
    errorMessage: "Failed to load Lido server data",
  });
}

export function useLidoStakingRouterQuery(query, options = {}) {
  return useLidoApolloQuery({
    query,
    options,
    client: stakingRouterClient,
    url: stakingRouterGraphqlUrl,
    errorMessage: "Failed to load Lido data",
  });
}
