import { ReactComponent as WestendCollectivesDark } from "./westend-collectives-dark.svg";
import { ReactComponent as WestendCollectivesLight } from "./westend-collectives-light.svg";
import { useIsDark } from "../../utils/hooks";
import { useMemo } from "react";

export default function WestendCollectivesIcon(props) {
  const isDark = useIsDark();
  const Icon = useMemo(
    () => (isDark ? WestendCollectivesDark : WestendCollectivesLight),
    [isDark],
  );
  return <Icon {...props} />;
}
