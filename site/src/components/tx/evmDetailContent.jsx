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
import SubstrateExtrinsicTable from "./substrateExtrinsicTable";
import styled from "styled-components";
import { space_y } from "../../styles/tailwindcss";
import { useQueryExtrinsicInfo } from "../../hooks/useQueryExtrinsicInfo";

const Wrapper = styled.div`
  ${space_y(24)}
`;

export default function TxEvmDetailContent({ data }) {
  const chainSetting = useChainSettings();
  const finalizedHeight = useSelector(finalizedHeightSelector);
  const { indexer } = data || {};
  const { blockHeight, extrinsicIndex } = indexer || {};
  const isFinalized = blockHeight <= finalizedHeight;

  const { data: extrinsicInfoData, loading } = useQueryExtrinsicInfo(
    blockHeight,
    extrinsicIndex,
  );
  const chainExtrinsic = extrinsicInfoData?.chainExtrinsic;

  const extrinsic = useMemo(() => {
    return {
      ...chainExtrinsic,
      ...data,
      isFinalized,
    };
  }, [data, isFinalized, chainExtrinsic]);

  const blockListData = useMemo(() => {
    return toTxEvmBlockDetailItem(extrinsic);
  }, [extrinsic]);

  const txListData = useMemo(() => {
    return toTxEvmTxDetailItem(extrinsic, chainSetting);
  }, [extrinsic, chainSetting]);

  return (
    <Wrapper>
      <Panel>
        <List data={blockListData} />

        <Divider />

        <List data={txListData} />
      </Panel>

      <SubstrateExtrinsicTable data={extrinsic} loading={loading} />
    </Wrapper>
  );
}
