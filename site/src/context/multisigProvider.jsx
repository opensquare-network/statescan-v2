import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.REACT_APP_PUBLIC_MULTISIG_API_END_POINT + "graphql",
  cache: new InMemoryCache(),
});

export default function MultisigProvider({ children }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
