import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { modeSelector } from "../store/reducers/settingSlice";
import light from "../styles/theme/light";
import dark from "../styles/theme/dark";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.REACT_APP_PUBLIC_IDENTITY_API_END_POINT + "graphql",
  cache: new InMemoryCache(),
});

export default function GlobalProvider({ children }) {
  const mode = useSelector(modeSelector);
  const theme = mode === "light" ? light : dark;

  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </ThemeProvider>
  );
}
