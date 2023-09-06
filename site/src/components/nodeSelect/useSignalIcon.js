import { useSelector } from "react-redux";
import { modeSelector } from "../../store/reducers/settingSlice";
import { getDelayType } from "./utils";
import { DarkSignalIcons, LightSignalIcons } from "./signalIcon";

export default function useSignalIcon(delay) {
  const themeMode = useSelector(modeSelector);
  const SignalIcons =
    themeMode === "light" ? LightSignalIcons : DarkSignalIcons;
  const delayType = getDelayType(delay);
  const SignalIcon = SignalIcons[delayType];

  return SignalIcon;
}
