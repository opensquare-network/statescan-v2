import { ReactComponent as DefaultDarkSvg } from "./default-inverse.svg";
import { ReactComponent as DefaultSvg } from "./default.svg";
import { useIsDark } from "../../../utils/hooks";
import { useMemo } from "react";

export default function DefaultIcon(props) {
  const isDark = useIsDark();
  const Icon = useMemo(() => (isDark ? DefaultDarkSvg : DefaultSvg), [isDark]);
  return <Icon {...props} />;
}
