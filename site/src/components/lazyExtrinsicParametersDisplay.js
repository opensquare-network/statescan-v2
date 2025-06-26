import { useMemo } from "react";
import Loading from "./loadings/loading";
import { useQueryExtrinsicInfo } from "../hooks/useQueryExtrinsicInfo";
import { finalizedHeightSelector } from "../store/reducers/chainSlice";
import { useSelector } from "react-redux";
import ExtrinsicParametersDisplay from "./extrinsicParametersDisplay";

export default function LazyExtrinsicParametersDisplay({ indexer }) {
  const finalizedHeight = useSelector(finalizedHeightSelector);
  const { blockHeight, extrinsicIndex } = indexer || {};

  const isFinalized = blockHeight <= finalizedHeight;

  const { data: extrinsicInfoData, loading } = useQueryExtrinsicInfo(
    blockHeight,
    extrinsicIndex,
  );

  const chainExtrinsic = extrinsicInfoData?.chainExtrinsic;

  const extrinsic = useMemo(() => {
    if (loading) {
      return null;
    }

    return {
      ...chainExtrinsic,
      isFinalized,
    };
  }, [chainExtrinsic, isFinalized, loading]);

  if (loading) {
    return <Loading style={{ padding: 0 }} />;
  }

  return <ExtrinsicParametersDisplay extrinsic={extrinsic} />;
}
