import { useMemo } from "react";
import { useSelector } from "react-redux";
import { modeSelector } from "../../store/reducers/settingSlice";
import {
  useOnClickOutside,
  useIsMounted,
  useWindowSize,
} from "@osn/common/hooks";
import { MOBILE_SIZE } from "../constants";

export { useOnClickOutside, useIsMounted, useWindowSize };

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
