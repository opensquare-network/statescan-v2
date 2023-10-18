import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.REACT_APP_PUBLIC_IDENTITY_API_END_POINT + "graphql",
  cache: new InMemoryCache(),
});

export default function IdentityProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
