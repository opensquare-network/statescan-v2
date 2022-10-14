import { ReactComponent as Statemint } from "./statemint.svg";
import { ReactComponent as StatemintDark } from "./statemint-dark.svg";
import { useIsDark } from "../../utils/hooks";
import { useMemo } from "react";

export default function StatemintIcon(props) {
  const isDark = useIsDark();
  const Icon = useMemo(() => (isDark ? StatemintDark : Statemint), [isDark]);
  return (
    <>
      <Icon {...props} />
    </>
  );
}
