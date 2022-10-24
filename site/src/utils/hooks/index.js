import { useWindowSize } from "@osn/common";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { modeSelector } from "../../store/reducers/settingSlice";
import { SM_SIZE } from "../../styles/breakpoints";

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
    isDesktop: width > SM_SIZE,
    isMobile: width <= SM_SIZE,
  };
}
