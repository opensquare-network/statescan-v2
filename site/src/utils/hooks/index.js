import { useWindowSize } from "@osn/common";
import { MOBILE_SIZE } from "@osn/constants";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { modeSelector } from "../../store/reducers/settingSlice";

export * from "./chain";

export function useIsDark() {
  const mode = useSelector(modeSelector);
  const isDark = useMemo(() => mode === "dark", [mode]);

  return isDark;
}

/**
 * @description `duplicated` osn/common but with different breakpoint
 * @breakpoint 768px
 */
export function useIsScreen() {
  const { width } = useWindowSize();

  return {
    isDesktop: width > MOBILE_SIZE,
    isMobile: width <= MOBILE_SIZE,
  };
}
