import { useEffect, useState, useMemo } from "react";
import isNil from "lodash.isnil";
import Loading from "./loadings/loading";
import { useQueryExtrinsicInfo } from "../hooks/useQueryExtrinsicInfo";
import { finalizedHeightSelector } from "../store/reducers/chainSlice";
import { useSelector } from "react-redux";
import ExtrinsicParametersDisplay from "./extrinsicParametersDisplay";

export default function LazyExtrinsicParametersDisplay({ indexer }) {
  const [isLoading, setIsLoading] = useState(true);
  const finalizedHeight = useSelector(finalizedHeightSelector);
  const { blockHeight, extrinsicIndex } = indexer || {};

  const isFinalized = blockHeight <= finalizedHeight;

  const { data: extrinsicInfoData, loading } = useQueryExtrinsicInfo(
    blockHeight,
    extrinsicIndex,
  );

  const chainExtrinsic = useMemo(() => {
    return extrinsicInfoData?.chainExtrinsic || {};
  }, [extrinsicInfoData]);

  const extrinsic = useMemo(() => {
    if (loading) {
      return null;
    }

    return {
      ...chainExtrinsic,
      isFinalized,
    };
  }, [chainExtrinsic, isFinalized, loading]);

  useEffect(() => {
    if (isNil(blockHeight) || isNil(extrinsicIndex) || loading || !extrinsic) {
      return;
    }

    setIsLoading(false);
  }, [blockHeight, extrinsic, extrinsicIndex, isLoading, loading]);

  if (isLoading) {
    return <Loading style={{ padding: 0 }} />;
  }

  return <ExtrinsicParametersDisplay extrinsic={extrinsic} />;
}
