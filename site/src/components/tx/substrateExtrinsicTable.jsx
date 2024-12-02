import styled from "styled-components";
import {
  Panel as PanelOrigin,
  StyledPanelTableWrapperNoBordered,
} from "../styled/panel";
import { Inter_14_600 } from "../../styles/text";
import Table from "../table";
import {
  extrinsicsHead,
  extrinsicsHeadSimpleMode,
} from "../../utils/constants";
import { getIsSimpleMode } from "../../utils/env";
import {
  toExtrinsicsTabTableItem,
  toExtrinsicsTabTableItemSimpleMode,
} from "../../utils/viewFuncs/toTableItem";
import { useQueryExtrinsicInfo } from "../../hooks/useQueryExtrinsicInfo";

const Panel = styled(PanelOrigin)`
  color: var(--fontPrimary);
  padding: 8px 0;
`;

const Title = styled.div`
  ${Inter_14_600}
  padding: 12px 24px;
`;

const isSimpleMode = getIsSimpleMode();

export default function SubstrateExtrinsicTable({ data }) {
  const { indexer } = data || {};
  const { blockHeight, extrinsicIndex } = indexer || {};

  const { data: extrinsicInfoData, loading } = useQueryExtrinsicInfo(
    blockHeight,
    extrinsicIndex,
  );
  const chainExtrinsic = extrinsicInfoData?.chainExtrinsic;

  let head = [];
  let tableData = [];

  if (!loading) {
    if (isSimpleMode) {
      head = extrinsicsHeadSimpleMode;
      tableData = toExtrinsicsTabTableItemSimpleMode([chainExtrinsic]);
    } else {
      head = extrinsicsHead;
      tableData = toExtrinsicsTabTableItem([chainExtrinsic]);
    }
  }

  return (
    <Panel>
      <Title>Substrate Extrinsic</Title>

      <StyledPanelTableWrapperNoBordered>
        <Table heads={head} data={tableData} loading={loading} />
      </StyledPanelTableWrapperNoBordered>
    </Panel>
  );
}
