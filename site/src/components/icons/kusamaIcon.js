import { useIsDark } from "../../utils/hooks";
import { useMemo } from "react";
import { ReactComponent as KusamaDark } from "./kusama-dark.svg";
import { ReactComponent as Kusama } from "./kusama.svg";

export default function KusamaIcon(props) {
  const isDark = useIsDark();
  const Icon = useMemo(() => (isDark ? KusamaDark : Kusama), [isDark]);
  return <Icon {...props} />;
}
