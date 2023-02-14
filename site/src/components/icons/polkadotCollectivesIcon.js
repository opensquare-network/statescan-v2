import { ReactComponent as PolkadotCollectivesDark } from "./polkadot-collectives-dark.svg";
import { ReactComponent as PolkadotCollectivesLight } from "./polkadot-collectives-light.svg";
import { useIsDark } from "../../utils/hooks";
import { useMemo } from "react";

export default function PolkadotCollectivesIcon(props) {
  const isDark = useIsDark();
  const Icon = useMemo(
    () => (isDark ? PolkadotCollectivesDark : PolkadotCollectivesLight),
    [isDark],
  );
  return <Icon {...props} />;
}
