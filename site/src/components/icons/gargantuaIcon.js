import { ReactComponent as GargantuaDark } from "./gargantua-dark.svg";
import { ReactComponent as Gargantua } from "./gargantua.svg";
import { useIsDark } from "../../utils/hooks";
import { useMemo } from "react";

export default function GargantuaIcon(props) {
  const isDark = useIsDark();
  const Icon = useMemo(() => (isDark ? GargantuaDark : Gargantua), [isDark]);
  return <Icon {...props} />;
}
