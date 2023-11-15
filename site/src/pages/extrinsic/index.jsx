import { useParams } from "react-router-dom";
import { isHash } from "../../utils";
import OnChainExtrinsic from "./onChainExtrinsic";
import Extrinsic from "./extrinsic";
import React from "react";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";

export default function PageExtrinsicRoot() {
  const { useOnChainBlockData } = useChainSettings();
  const { id } = useParams();

  return useOnChainBlockData && !isHash(id) ? (
    <OnChainExtrinsic />
  ) : (
    <Extrinsic />
  );
}
