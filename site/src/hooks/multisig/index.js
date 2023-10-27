import { useParams } from "react-router-dom";

export function useMultisigUrlParams() {
  const { id = "" } = useParams();
  const [blockHeight, extrinsicIndex, address] = id.split("-");

  return {
    blockHeight: parseInt(blockHeight),
    extrinsicIndex: parseInt(extrinsicIndex),
    address,
  };
}
