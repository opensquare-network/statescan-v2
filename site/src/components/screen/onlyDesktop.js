// duplicated in osn common-ui

import { useIsScreen } from "@osn/common/hooks/useIsScreen";

export function OnlyDesktop({ children }) {
  const { isDesktop } = useIsScreen();

  return <>{isDesktop && children}</>;
}
