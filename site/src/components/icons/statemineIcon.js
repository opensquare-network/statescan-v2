import { ReactComponent as Statemine } from "./statemine.svg";
import { ReactComponent as StatemineDark } from "./statemine-dark.svg";
import { useIsDark } from "../../utils/hooks";
import { useMemo } from "react";

export default function StatemineIcon(props) {
  const isDark = useIsDark();
  const Icon = useMemo(() => (isDark ? StatemineDark : Statemine), [isDark]);
  return <Icon {...props} />;
}
