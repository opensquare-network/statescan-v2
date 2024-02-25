import { ReactComponent as ShadowDark } from "./shadow-dark.svg";
import { ReactComponent as Shadow } from "./shadow.svg";
import { useIsDark } from "../../utils/hooks";
import { useMemo } from "react";

export default function ShadowIcon(props) {
  const isDark = useIsDark();
  const Icon = useMemo(() => (isDark ? ShadowDark : Shadow), [isDark]);
  return <Icon {...props} />;
}
