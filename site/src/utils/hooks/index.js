import { useMemo } from "react";
import { useSelector } from "react-redux";
import { modeSelector } from "../../store/reducers/settingSlice";

export {
  useOnClickOutside,
  useIsMounted,
  useWindowSize,
} from "@osn/common/hooks";

export function useIsDark() {
  const mode = useSelector(modeSelector);
  const isDark = useMemo(() => mode === "dark", [mode]);

  return isDark;
}
