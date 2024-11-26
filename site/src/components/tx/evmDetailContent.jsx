import { useMemo } from "react";
import useChainSettings from "../../utils/hooks/chain/useChainSettings";
import {
  toTxEvmBlockDetailItem,
  toTxEvmTxDetailItem,
} from "../../utils/viewFuncs/toDetailItem";
import { Panel } from "../styled/panel";
import List from "../list";
import Divider from "../styled/divider";
import { useSelector } from "react-redux";
import { finalizedHeightSelector } from "../../store/reducers/chainSlice";
import { useQueryExtrinsicInfo } from "../../hooks/useQueryExtrinsicInfo";

export default function TxEvmDetailContent({ data }) {
  const chainSetting = useChainSettings();
  const finalizedHeight = useSelector(finalizedHeightSelector);
  const { blockNumber, transactionIndex } = data || {};
  const isFinalized = blockNumber <= finalizedHeight;

  const { data: extrinsicInfoData, loading } = useQueryExtrinsicInfo(
    blockNumber,
    transactionIndex,
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
      ...data,
      isFinalized,
    };
  }, [data, isFinalized, chainExtrinsic, loading]);

  const blockListData = useMemo(() => {
    return toTxEvmBlockDetailItem(extrinsic);
  }, [extrinsic]);

  const txListData = useMemo(() => {
    return toTxEvmTxDetailItem(extrinsic, chainSetting);
  }, [extrinsic, chainSetting]);

  return (
    <>
      <Panel>
        <List data={blockListData} />

        <Divider />

        <List data={txListData} />
      </Panel>
    </>
  );
}
