import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getChainApi } from "../../services/chainApi";
import {
  nodesSelector,
  setNodesDelay,
  currentNodeSelector,
} from "../../store/reducers/nodeSlice";

const TIMEOUT = 10000;
let count = 0;

const fetchApiTime = async (api) => {
  const startTime = Date.now();
  try {
    await api.rpc.system.chain();
  } catch (e) {
    return "error";
  }

  const endTime = Date.now();
  return endTime - startTime;
};

const timeout = async (ms) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
  return "timeout";
};

const testNet = async (api) => {
  return await Promise.race([fetchApiTime(api), timeout(TIMEOUT)]);
};

const useUpdateNodesDelay = () => {
  const nodes = useSelector(nodesSelector);
  const currentNode = useSelector(currentNodeSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    const updateNodeDelay = async (url) => {
      try {
        const api = await getChainApi(url);
        const delay = await testNet(api);
        return delay;
      } catch {
        return "";
      }
    };
    const intervalId = setInterval(async () => {
      const updateNodes = (nodes || []).filter(
        (item) => item.url === currentNode || item.update,
      );
      if (updateNodes && updateNodes.length > 0) {
        const updateNode = updateNodes[count % updateNodes.length];
        const delay = await updateNodeDelay(updateNode.url);
        dispatch(setNodesDelay([{ url: updateNode.url, delay }]));
      }
      count++;
    }, 5000);
    return () => clearInterval(intervalId);
  }, [dispatch, nodes, currentNode]);
};

export default useUpdateNodesDelay;
