import { useSelector } from "react-redux";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { modeSelector } from "../store/reducers/settingSlice";
import light from "../styles/theme/light";
import dark from "../styles/theme/dark";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

function buildThemeVariables(theme = {}) {
  return Object.keys(theme)
    .map((key) => `--${key}: ${theme[key]};`)
    .join("");
}

const GlobalThemeVariables = createGlobalStyle(({ theme }) => {
  const themeVariables = buildThemeVariables(theme);
  return `:root {${themeVariables}`;
});

const client = new ApolloClient({
  uri: process.env.REACT_APP_PUBLIC_GRAPHQL_API_END_POINT + "graphql",
  cache: new InMemoryCache(),
});

export default function GlobalProvider({ children }) {
  const mode = useSelector(modeSelector);
  const theme = mode === "light" ? light : dark;

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalThemeVariables />
        {children}
      </ThemeProvider>
    </ApolloProvider>
  );
}
