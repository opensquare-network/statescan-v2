import { ReactComponent as Westmint } from "./westmint.svg";
import { ReactComponent as WestmintDark } from "./westmint-dark.svg";
import { useIsDark } from "../../utils/hooks";
import { useMemo } from "react";

export default function WestmintIcon(props) {
  const isDark = useIsDark();
  const Icon = useMemo(() => (isDark ? WestmintDark : Westmint), [isDark]);
  return (
    <>
      <Icon {...props} />
    </>
  );
}
