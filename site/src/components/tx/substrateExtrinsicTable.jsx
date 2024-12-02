import styled from "styled-components";
import { StyledPanelTableWrapper } from "../styled/panel";
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

const Wrapper = styled(StyledPanelTableWrapper)`
  color: var(--fontPrimary);
  padding: 8px 0;
`;

const Title = styled.div`
  ${Inter_14_600}
  padding: 12px 24px;
`;

const isSimpleMode = getIsSimpleMode();

export default function SubstrateExtrinsicTable({ data, loading }) {
  let head = [];
  let tableData = [];

  if (!loading) {
    if (isSimpleMode) {
      head = extrinsicsHeadSimpleMode;
      tableData = toExtrinsicsTabTableItemSimpleMode([data]);
    } else {
      head = extrinsicsHead;
      tableData = toExtrinsicsTabTableItem([data]);
    }
  }

  return (
    <Wrapper>
      <Title>Substrate Extrinsic</Title>
      <Table heads={head} data={tableData} loading={loading} />
    </Wrapper>
  );
}
