import { ApolloClient, InMemoryCache } from "@apollo/client";

const isProduction = process.env.REACT_APP_PUBLIC_MODE === "production";
const productGraphqlUrl = process.env.REACT_APP_PUBLIC_LIDO_PRODUCT_GRAPHQL_URL;

function getLidoUrl(devUrl) {
  return isProduction ? productGraphqlUrl : devUrl;
}

function createLidoClient(url) {
  return new ApolloClient({
    uri: url || "/",
    cache: new InMemoryCache(),
  });
}

export const lidoServerUrl = process.env.REACT_APP_PUBLIC_LIDO_SERVER_URL;
export const lidoServerClient = createLidoClient(lidoServerUrl);

export const lidoGraphqlUrl = getLidoUrl(
  process.env.REACT_APP_PUBLIC_LIDO_GRAPHQL_URL,
);
export const stakingRouterGraphqlUrl = getLidoUrl(
  process.env.REACT_APP_PUBLIC_LIDO_STAKING_ROUTER_GRAPHQL_URL,
);

export const lidoClient = createLidoClient(lidoGraphqlUrl);
export const stakingRouterClient = createLidoClient(stakingRouterGraphqlUrl);
