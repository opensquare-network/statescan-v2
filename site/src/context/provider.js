import { useSelector } from "react-redux";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { modeSelector } from "../store/reducers/settingSlice";
import light from "../styles/theme/light";
import dark from "../styles/theme/dark";
import ApolloProvider from "./apollo";

function buildThemeVariables(theme = {}) {
  return Object.keys(theme)
    .map((key) => `--${key}: ${theme[key]};`)
    .join("");
}

const GlobalThemeVariables = createGlobalStyle(({ theme }) => {
  const themeVariables = buildThemeVariables(theme);
  return `:root {${themeVariables}`;
});

export default function GlobalProvider({ children }) {
  const mode = useSelector(modeSelector);
  const theme = mode === "light" ? light : dark;

  return (
    <ApolloProvider>
      <ThemeProvider theme={theme}>
        <GlobalThemeVariables />
        {children}
      </ThemeProvider>
    </ApolloProvider>
  );
}
