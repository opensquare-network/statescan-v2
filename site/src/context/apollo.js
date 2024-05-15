import {
  ApolloClient,
  ApolloProvider as Provider,
  InMemoryCache,
} from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.REACT_APP_PUBLIC_GRAPHQL_API_END_POINT + "graphql",
  cache: new InMemoryCache(),
});

export default function ApolloProvider({ children }) {
  return <Provider client={client}>{children}</Provider>;
}
