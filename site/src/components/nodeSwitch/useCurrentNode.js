import { useSelector } from "react-redux";
import {
  currentNodeSelector,
  nodesSelector,
} from "../../store/reducers/nodeSlice";

export default function useCurrentNode() {
  const nodes = useSelector(nodesSelector);
  const currentNode = useSelector(currentNodeSelector);
  return nodes?.find((item) => item.url === currentNode);
}
