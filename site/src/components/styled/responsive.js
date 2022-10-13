import { useIsScreen } from "../../utils/hooks";

export function PC({ children }) {
  const { isDesktop } = useIsScreen();
  return <>{isDesktop && children}</>;
}

export function Mobile({ children }) {
  const { isMobile } = useIsScreen();
  return <>{isMobile && children}</>;
}
