import { ApolloClient, InMemoryCache, useLazyQuery } from "@apollo/client";
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

const client = new ApolloClient({
  uri: process.env.REACT_APP_PUBLIC_GRAPHQL_API_END_POINT + "graphql",
  cache: new InMemoryCache(),
});

/**
 * @type {typeof useQuery}
 */
export function useIdentityQuery(query, options = {}, ...args) {
  const { modules } = useChainSettings();

  let searchOptions = {
    ...options,
    variables: {
      ...options.variables,
      search: options.variables?.search,
    },
  };
  const [fetcher, lazyQueryResult] = useIdentityLazyQuery(
    query,
    searchOptions,
    ...args,
  );

  useEffect(() => {
    if (modules?.identity) {
      fetcher();
    }
  }, [modules?.identity, fetcher]);

  return lazyQueryResult;
}
/**
 * @type {typeof useLazyQuery}
 */
export function useIdentityLazyQuery(query, options = {}, ...args) {
  options.client = options.client || identityClient;

  const { modules = {} } = useChainSettings();
  let [fetcher, lazyQueryResult] = useLazyQuery(query, options, ...args);

  if (!modules?.identity) {
    fetcher = noop;
  }

  return [fetcher, lazyQueryResult];
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
    if (modules?.multisig) {
      fetcher();
    }
  }, [fetcher, modules?.multisig]);

  return lazyQueryResult;
}

/**
 * @type {typeof useLazyQuery}
 */
export function useMultisigLazyQuery(query, options = {}, ...args) {
  options.client = options.client || multisigClient;

  const { modules } = useChainSettings();
  let [fetcher, lazyQueryResult] = useLazyQuery(query, options, ...args);

  if (!modules?.multisig) {
    fetcher = noop;
  }

  return [fetcher, lazyQueryResult];
}

/**
 * @type {typeof useQuery}
 */
export function useVestingsQuery(query, options = {}, ...args) {
  const { modules } = useChainSettings();

  const [fetcher, lazyQueryResult] = useVestingsLazyQuery(
    query,
    options,
    ...args,
  );

  useEffect(() => {
    if (modules?.vestings) {
      fetcher();
    }
  }, [modules?.vestings, fetcher]);

  return lazyQueryResult;
}

/**
 * @type {typeof useLazyQuery}
 */
export function useVestingsLazyQuery(query, options = {}, ...args) {
  options.client = options.client || client;

  const { modules } = useChainSettings();
  let [fetcher, lazyQueryResult] = useLazyQuery(query, options, ...args);

  if (!modules?.vestings) {
    fetcher = noop;
  }

  return [fetcher, lazyQueryResult];
}

/**
 * @type {typeof import("@apollo/client").useQuery}
 */
function useGraphQLQuery() {}
