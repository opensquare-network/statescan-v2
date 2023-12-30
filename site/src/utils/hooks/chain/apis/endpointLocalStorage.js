import { getChainNodes } from "../../../chain";

export default function getEndpointFromLocalStorage() {
  let localNodeUrl = null;
  try {
    localNodeUrl = localStorage.getItem("nodeUrl");
  } catch (e) {
    // ignore parse error
  }

  const chainNodes = getChainNodes();
  const targetNode = (chainNodes || []).find(({ url }) => url === localNodeUrl);
  return targetNode?.url;
}
