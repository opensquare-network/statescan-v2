import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useQueryExtrinsicInfo } from "../../hooks/useQueryExtrinsicInfo";
import ExtrinsicDetailTabs from "../../pages/extrinsic/detailTabs";
import { finalizedHeightSelector } from "../../store/reducers/chainSlice";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import { toExtrinsicDetailItem } from "../../utils/viewFuncs/toDetailItem";
import ExtrinsicParametersDisplay from "../extrinsicParametersDisplay";
import List from "../list";
import { Panel } from "../styled/panel";

export default function TxSubstrateDetailContent({ data = {} }) {
  const { modules } = useChainSettings();
  const finalizedHeight = useSelector(finalizedHeightSelector);
  const { blockHeight, extrinsicIndex } = data?.indexer || {};
  const isFinalized = blockHeight <= finalizedHeight;

  const { data: extrinsicInfoData, loading } = useQueryExtrinsicInfo(
    blockHeight,
    extrinsicIndex,
  );

  const chainExtrinsic = extrinsicInfoData?.chainExtrinsic || {};

  const extrinsic = useMemo(() => {
    if (loading) {
      return null;
    }

    return {
      ...chainExtrinsic,
      isFinalized,
    };
  }, [chainExtrinsic, isFinalized, loading]);

  const listData = useMemo(() => {
    if (loading) {
      return [];
    }

    return toExtrinsicDetailItem(extrinsic, { modules });
  }, [extrinsic, modules, loading]);

  return (
    <>
      <Panel>
        <List data={listData} />

        <ExtrinsicParametersDisplay extrinsic={extrinsic} title="Parameters" />
      </Panel>

      <ExtrinsicDetailTabs extrinsic={extrinsic} />
    </>
  );
}
