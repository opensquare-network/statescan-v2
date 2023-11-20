import {
  ApolloClient,
  InMemoryCache,
  useQuery,
  useLazyQuery,
} from "@apollo/client";
import noop from "lodash.noop";
import { useEffect } from "react";
import useChainSettings from "../utils/hooks/chain/useChainSettings";

const identityClient = new ApolloClient({
  uri: process.env.REACT_APP_PUBLIC_IDENTITY_API_END_POINT + "graphql",
  cache: new InMemoryCache(),
});

const multisigClient = new ApolloClient({
  uri: process.env.REACT_APP_PUBLIC_MULTISIG_API_END_POINT + "graphql",
  cache: new InMemoryCache(),
});

/**
 * @type {typeof useQuery}
 */
export function useIdentityQuery(query, options = {}, ...args) {
  options.client = options.client || identityClient;
  return useQuery(query, options, ...args);
}
/**
 * @type {typeof useLazyQuery}
 */
export function useIdentityLazyQuery(query, options = {}, ...args) {
  options.client = options.client || identityClient;
  return useLazyQuery(query, options, ...args);
}

/**
 * @type {typeof useQuery}
 */
export function useMultisigQuery(query, options = {}, ...args) {
  options.client = options.client || multisigClient;

  const { modules } = useChainSettings();
  const [fetcher, lazyQueryResult] = useMultisigLazyQuery(
    query,
    options,
    ...args,
  );

  useEffect(() => {
    if (modules.multisig) {
      fetcher();
    }
  }, [query, options, args, modules.multisig, fetcher]);

  return lazyQueryResult;
}

/**
 * @type {typeof useLazyQuery}
 */
export function useMultisigLazyQuery(query, options = {}, ...args) {
  options.client = options.client || multisigClient;

  const { modules } = useChainSettings();
  let [fetcher, lazyQueryResult] = useLazyQuery(query, options, ...args);

  if (!modules.multisig) {
    fetcher = noop;
  }

  return [fetcher, lazyQueryResult];
}
