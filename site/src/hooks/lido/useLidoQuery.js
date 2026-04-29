import { ApolloClient, InMemoryCache, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToast } from "../../store/reducers/toastSlice";

const lidoGraphqlUrl = process.env.REACT_APP_PUBLIC_LIDO_GRAPHQL_URL;

const lidoClient = new ApolloClient({
  uri: lidoGraphqlUrl || "/",
  cache: new InMemoryCache(),
});

export function useLidoQuery(query, options = {}) {
  const dispatch = useDispatch();
  const missingGraphqlUrl = !lidoGraphqlUrl;
  const queryResult = useQuery(query, {
    fetchPolicy: "no-cache",
    notifyOnNetworkStatusChange: true,
    ...options,
    skip: missingGraphqlUrl || options.skip,
    client: lidoClient,
  });

  useEffect(() => {
    if (missingGraphqlUrl) {
      dispatch(
        addToast({
          type: "error",
          message: "REACT_APP_PUBLIC_LIDO_GRAPHQL_URL is not set",
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
