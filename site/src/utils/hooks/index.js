import { useWindowSize } from "@osn/common";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { modeSelector } from "../../store/reducers/settingSlice";
import { MOBILE_SIZE } from "../constants";

export function useIsDark() {
  const mode = useSelector(modeSelector);
  const isDark = useMemo(() => mode === "dark", [mode]);

  return isDark;
}

/**
 * @description `duplicated` osn/common but with different breakpoint
 * @breakpoint 600px
 */
export function useIsScreen() {
  const { width } = useWindowSize();

  return {
    isDesktop: width > MOBILE_SIZE,
    isMobile: width <= MOBILE_SIZE,
  };
}
