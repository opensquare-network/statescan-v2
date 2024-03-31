import { ReactComponent as CrustDark } from "./crust-dark.svg";
import { ReactComponent as Crust } from "./crust.svg";
import { useIsDark } from "../../utils/hooks";
import { useMemo } from "react";

export default function CrustIcon(props) {
  const isDark = useIsDark();
  const Icon = useMemo(() => (isDark ? CrustDark : Crust), [isDark]);
  return <Icon {...props} />;
}
