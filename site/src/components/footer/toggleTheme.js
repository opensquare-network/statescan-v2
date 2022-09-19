import Switch from "../styled/switch";
import { ReactComponent as SunIcon } from "./sun.svg";
import { ReactComponent as MoonIcon } from "./moon.svg";
import { useDispatch, useSelector } from "react-redux";
import { modeSelector, setMode } from "../../store/reducers/modeSlice";

export default function ToggleTheme() {
  const dispatch = useDispatch();
  const mode = useSelector(modeSelector);
  const Icon = mode === "light" ? SunIcon : MoonIcon;

  return (
    <Switch
      onToggle={(on) => {
        dispatch(setMode(on ? "dark" : "light"));
      }}
    >
      {" "}
      <Icon />
    </Switch>
  );
}
