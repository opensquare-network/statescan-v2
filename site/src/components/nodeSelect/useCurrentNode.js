import { useSelector } from "react-redux";
import { currentNodeSelector } from "../../store/reducers/nodeSlice";
import { chainSelector } from "../../store/reducers/settingSlice";
import useNodes from "./useNodes";

export default function useCurrentNode() {
  const chain = useSelector(chainSelector);
  const currentNodeSetting = useSelector(currentNodeSelector);

  const nodes = useNodes();
  const currentNode = nodes?.find(
    (item) => item.url === currentNodeSetting?.[chain],
  );

  return currentNode;
}
