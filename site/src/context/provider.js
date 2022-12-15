import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { modeSelector } from "../store/reducers/settingSlice";
import light from "../styles/theme/light";
import dark from "../styles/theme/dark";

export default function GlobalProvider({ children }) {
  const mode = useSelector(modeSelector);
  const theme = mode === "light" ? light : dark;

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
