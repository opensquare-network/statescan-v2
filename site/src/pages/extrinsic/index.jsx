import { useParams } from "react-router-dom";
import { isHash } from "../../utils";
import OnChainExtrinsic from "./onChainExtrinsic";
import Extrinsic from "./extrinsic";

export default function PageExtrinsicRoot() {
  const { id } = useParams();

  return isHash(id) ? <Extrinsic /> : <OnChainExtrinsic />;
}
