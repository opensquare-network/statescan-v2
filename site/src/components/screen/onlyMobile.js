// duplicated in osn common-ui

import { useIsScreen } from "@osn/common/hooks/useIsScreen";

export function OnlyMobile({ children }) {
  const { isMobile } = useIsScreen();

  return <>{isMobile && children}</>;
}
