import { ReactComponent as Tangle } from "./tangle.svg";
import { useMemo } from "react";

export default function CrustIcon(props) {
  const Icon = useMemo(() => Tangle, []);
  return <Icon {...props} />;
}
