import {
  ApolloClient,
  InMemoryCache,
  useQuery,
  useLazyQuery,
} from "@apollo/client";

const cache = new InMemoryCache();

const identityClient = new ApolloClient({
  uri: process.env.REACT_APP_PUBLIC_IDENTITY_API_END_POINT + "graphql",
  cache: new InMemoryCache(),
});

const multisigClient = new ApolloClient({
  uri: process.env.REACT_APP_PUBLIC_MULTISIG_API_END_POINT + "graphql",
  cache,
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
  return useQuery(query, options, ...args);
}
