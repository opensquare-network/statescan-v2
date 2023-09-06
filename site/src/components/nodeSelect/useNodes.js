import { useSelector } from "react-redux";
import { chainSelector } from "../../store/reducers/settingSlice";
import { nodesSelector } from "../../store/reducers/nodeSlice";

export default function useNodes() {
  const chain = useSelector(chainSelector);
  const nodesSetting = useSelector(nodesSelector);
  return nodesSetting?.[chain] || [];
}
