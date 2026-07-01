import { ApolloClient, InMemoryCache } from "@apollo/client";

function createLidoClient(url) {
  return new ApolloClient({
    uri: url || "/",
    cache: new InMemoryCache(),
  });
}

export const lidoServerUrl = process.env.REACT_APP_PUBLIC_LIDO_SERVER_URL;
export const lidoServerClient = createLidoClient(lidoServerUrl);
