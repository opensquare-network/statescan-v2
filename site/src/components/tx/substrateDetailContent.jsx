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
import { useVerifiedContractsVersion } from "../../context/verifiedContracts";

export default function TxSubstrateDetailContent({ data = {} }) {
  const { modules } = useChainSettings();
  const verifiedContractsVersion = useVerifiedContractsVersion();
  const finalizedHeight = useSelector(finalizedHeightSelector);
  const { blockHeight, extrinsicIndex } = data?.indexer || {};
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

  // Recompute the decoded call once the verified contracts are loaded.
  const listData = useMemo(() => {
    if (loading) {
      return [];
    }

    return toExtrinsicDetailItem(extrinsic, { modules });
  }, [extrinsic, modules, loading, verifiedContractsVersion]); // eslint-disable-line react-hooks/exhaustive-deps

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
